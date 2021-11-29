<template>
  <el-card class="box-card">
  <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <!--面包屑：显示当前页面的路径，快速返回首页。-->
        <el-breadcrumb-item>事件配置新增</el-breadcrumb-item>
        <el-breadcrumb-item>事件配置列表</el-breadcrumb-item>
      </el-breadcrumb>

    <!--输入内容-->
    <div class="boxContext">
      <div class="boxRight">
        <div class="xiangqing">
          <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
            <el-form-item label="事件名称" prop="eventName">
              <el-input v-model="form.eventName"
                        placeholder="数字、英文或组合"
                        onKeyUp="value=value.replace(/[\W]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="通知描述" prop="notificationDescription">
              <el-input v-model="form.notificationDescription" placeholder="1-25个字符"></el-input>
            </el-form-item>
            <el-form-item label="事件级别" prop="eventLevel">
              <el-select v-model="form.eventLevel"
                         placeholder="选择事件级别">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型" prop="deviceTypeName">
              <el-select v-model="form.deviceTypeName"
                         placeholder="选择设备类型"
                         @change="selectDevName"
              >
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
            <br>
          </el-form>
        </div>
      </div>
    </div>

    <!--底部按钮-->
    <div class="boxFooter">
      <el-button class="bottoms-style" size="mini" type="success" @click="save('form')">保存</el-button>
      <el-button class="bottoms-style" size="mini" @click="back">返回</el-button>
    </div>
    <div class="boxSpace"></div>
  </div>
  </el-card>

</template>

<style>
.boxPage{
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  /*background-color: #262f40;*/
}
.boxContext{
  hight: 85%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.boxHeader{
  height: 5%;
  width: 100%;
  margin: 0;
  padding: 0;

}
.boxLeft{
  height: 100%;
  width: 20%;
  margin: 0;
  padding: 0;
  /*background-color: #00b0a6;*/
}
.boxRight{
  height: 100%;
  width: 80%;
  margin: 0;
  padding: 0;
  /*background-color: #262f40;*/
}
.boxFooter{
  height: 8%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}
.boxSpace{
  width: 100%;
  height: 2%;
}
.boxStyle{
  margin: 5%;
  padding: 0;
  height: 30%;
  width: 90%;
  box-shadow: 0px 0px 2px #000000;
}
.boxImg{
  height: 80%;
  width: 100%;
  margin: 0;
}
.boxStyleLabel{
  margin-bottom: 0px;
  padding: 0;
  height: 20%;
  width: 100%;
  background-color: #7f7f7f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-styleLabel{
  flex: 1;
  text-align: center;
  line-height: 80%;
  font-weight: bold;
  color: rgb(255,255,255);
  z-index: 3;
}

/*右侧详情页*/

.xiangqing  {
  text-align: left;
  line-height: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow:auto;
  margin: 1%;
  height: 97%;
  box-shadow: 0px 0px 2px #000000;
  background-color: #ffffff;
}
.xiangqing .el-form-item {
  width: 47%;
}
.xiangqing .el-form-item-full {
  width: 94%;
}
.xiangqing .el-form-item__label {
  font-weight: bolder;
}
.forms{
  padding-left: 5%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.bottoms-style{
  position: relative;
  bottom: 110%;
  font-weight: bold;
}
</style>

<script>
export default {
  data(){
    return {
      //事件级别下拉框
      options:[{
        value:'普通',
        label:"普通"
      },{
        value:'重要',
        label:"重要"
      }],
      //设备下拉框
      optionsOfDev:[],
      //规则下拉框
      optionsOfRul:[],
      postData:[],
      //内容表单
      form: {
        eventName: '',
        notificationDescription: '',
        eventLevel: '',
        deviceTypeName: '',
        alarmName: ''
      },
      //输入规则
      rules: {
        eventName: [
          { required: true, message: '请输入事件名称', trigger: 'blur' },
        ],
        notificationDescription: [
          { required: true, message: '请输入通知描述', trigger: 'blur' }
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
    //生命周期
    this.fetchDev()
    console.log(sessionStorage.getItem('userName'))
  },
  methods: {
    //读取设备类型
    fetchDev(){
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceType/getAllName',
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
    //读取规则
    selectDevName(){
      let postData={
        deviceTypeName:this.form.deviceTypeName
      };
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/alarm/getBy',
        params: postData
        }).then(response =>
        {
        console.log(response.data)
        let optionsList = [];
        for(let i=0;i<response.data.length;i++){
          console.log(Object.values(response.data)[i]);
          let optionx={
            id:i,
            name:Object.values(response.data)[i],
          };
          optionsList.push(optionx);
        }
        this.optionsOfRul = optionsList;
        console.log(this.optionsOfRul)
      }).catch(error =>
      {
        console.log(error);
      });
    },
    //提交
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData={
            eventName: this.form.eventName,
            notificationDescription: this.form.notificationDescription,
            eventLevel: this.form.eventLevel,
            deviceTypeName: this.form.deviceTypeName,
            alarmName: this.form.alarmName.join(','),
            createUser:sessionStorage.getItem('userName')
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url:'http://localhost:8080/eventConfig/add',
            params:postData
          }).then(response=>
          {
            // console.log("成功");
            console.log(response);
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('添加失败（编号重复）');
            }
          }).catch(error =>
          {
            console.log(error);
          });

          // alert('保存成功！');
          this.$router.replace('/home/eventConfList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //返回
    back() {
      this.$router.replace('/home/eventConfList')
    }
  }
}

</script>
