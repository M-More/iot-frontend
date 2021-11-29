<template>
  <el-card class="box-card">
    <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>事件配置新增</el-breadcrumb-item>
        <el-breadcrumb-item>事件配置列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="boxContext">
        <div class="boxRight">
          <div class="xiangqing">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
              <el-form-item label="设备编号" prop="deviceNumber">
                <el-input v-model="form.deviceNumber"
                          placeholder="请输入设备编号，如S_001"
                          ></el-input>
              </el-form-item>
              <el-form-item label="告警时间" prop="eventInfoOccurenceTime">
                <el-input v-model="form.eventInfoOccurenceTime" placeholder="请输入告警时间"></el-input>
              </el-form-item>
              <el-form-item label="告警名称" prop="alarmName">
                              <el-input v-model="form.alarmName" placeholder="请输入告警名称"></el-input>
              </el-form-item>
              <el-form-item label="来源" prop="eventInfoResource">
                              <el-input v-model="form.eventInfoResource" placeholder="请输入来源"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="eventInfoDescription">
                              <el-input v-model="form.eventInfoDescription"></el-input>
              </el-form-item>
              <br>
            </el-form>
          </div>
        </div>
      </div>
      <div class="boxFooter">
        <el-button class="bottoms-style" size="mini" type="success" @click="save('form')">保存</el-button>
        <el-button class="bottoms-style" size="mini" @click="back">返回首页</el-button>
      </div>
      <div class="boxSpace"></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Simulation",
  data(){
    return {
      options:[{
        value:'普通',
        label:"普通"
      },{
        value:'重要',
        label:"重要"
      }],
      optionsOfDev:[],
      optionsOfRul:[],
      postData:[],
      form: {
        deviceNumber: '',
        eventInfoOccurenceTime: '',
        alarmName: '',
        eventInfoResource: '',
        eventInfoDescription: ''
      },
      rules: {
        deviceNumber: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        eventInfoOccurenceTime: [
          { required: true, message: '请输入告警时间', trigger: 'blur' }
        ],
        alarmName: [
          { required: true, message: '请输入事件级别', trigger: 'blur' }
        ],
        eventInfoResource: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        eventInfoDescription: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // this.fetchDev()
    // console.log(sessionStorage.getItem('userName'))
  },
  methods: {
    fetchDev(){
      //读取设备类型
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
    selectDevName(){
      let postData={
        deviceTypeName:this.form.deviceTypeName
      };
      //读取规则
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
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData={
            deviceNumber: this.form.deviceNumber,
            eventInfoOccurenceTime: this.form.eventInfoOccurenceTime,
            alarmName: this.form.alarmName,
            eventInfoResource: this.form.eventInfoResource,
            eventInfoDescription: this.form.eventInfoDescription,
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url:'http://localhost:8080/eventInfo/alarm',
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/home')
    },
    reflash(){
      //刷新
      this.$router.go(0);
    },
  }
}
</script>

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