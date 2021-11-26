<template>
  <el-card class="box-card">
    <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>警告新增</el-breadcrumb-item>
        <el-breadcrumb-item>警告列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="boxContext">
        <div class="boxRight">
          <div class="xiangqing">
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
              <el-form-item label="设备类型" prop="deviceTypeName">
                <el-select v-model="form.deviceTypeName"
                           placeholder="选择设备类型">
                  <el-option
                      v-for="item in optionsOfDev"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="alarmStatus">
                <el-select v-model="form.alarmStatus" placeholder="默认开关">
                  <el-option label="开" value="开"></el-option>
                  <el-option label="关" value="关"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规则说明" prop="ruleDescription">
                <el-input v-model="form.ruleDescription"></el-input>
              </el-form-item>

              <el-form-item label="备注" class="el-form-item-full">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="form.mainText"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
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
      options:[{
        value:'普通',
        label:"普通"
      },{
        value:'重要',
        label:"重要"
      }],
      //设备类型
      optionsOfDev:[],
      optionsOfRul:[],
      postData:[],
      form: {
        alarmName: '',
        alarmCode:'',
        alarmLevel:'',
        deviceTypeName:'',
        alarmStatus:'',
        ruleDescription:'',
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
  },
  methods: {
    fetchDev() {
      //读取设备类型
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceType/getAllName',
      }).then(response => {
        let optionsList = [];
        for (let i = 0; i < response.data.length; i++) {
          console.log(Object.values(response.data)[i]);
          let optionx = {
            id: i,
            name: Object.values(response.data)[i],
          };
          optionsList.push(optionx);
        }
        console.log(optionsList)
        this.optionsOfDev = optionsList;
      }).catch(error => {
        console.log(error);
      });
    },

    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData = {
            alarmName: this.form.alarmName,
            alarmCode: "GJ_" + this.form.alarmCode,
            alarmLevel: this.form.alarmLevel,
            deviceTypeName: this.form.deviceTypeName,
            alarmStatus: this.form.alarmStatus,
            ruleDescription: this.form.ruleDescription,
            createUser:sessionStorage.getItem('userName')
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url: 'http://localhost:8080/alarm/add',
            params: postData
          }).then(response => {
            console.log(response);
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('添加失败');
            }

          }).catch(error => {
            console.log(error);
          });

          // alert('保存成功！');
          this.$router.replace('/home/alertList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/home/alertList')
    }
  }
}

</script>
