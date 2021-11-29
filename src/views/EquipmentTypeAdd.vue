<template>
  <el-card class="box-card">
    <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>设备类型新增</el-breadcrumb-item>
        <el-breadcrumb-item>设备类型列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="boxContext">
        <div class="boxRight">
          <div class="xiangqing">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
              <el-form-item label="设备类型名称" prop="deviceTypeName">
                <el-input v-model="form.deviceTypeName"></el-input>
              </el-form-item>
              <el-form-item label="设备类型编号" prop="deviceTypeCode">
                <el-input v-model="form.deviceTypeCode"
                          placeholder="编码格式为：SBLX_数字 "
                          onKeyUp="value=value.replace(/[\D]/g,'')">
                  <template slot="prepend">SBLX_</template>
                </el-input>
              </el-form-item>
              <el-form-item label="备注" class="el-form-item-full">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="form.deviceNote"
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
      //设备类型
      postData:[],
      //表单 给prop用
      form: {
        deviceTypeName: '',
        deviceTypeCode:'',
        deviceNote:'',
      },
      //必选规则 小红星
      rules: {
        deviceTypeName: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' },
        ],
        deviceTypeCode: [
          { required: true, message: '请输入设备类型编号', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    // 保存
    save(formName) {
      // 必选校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //传参 所有选项
          let postData = {
            deviceTypeName: this.form.deviceTypeName,
            deviceTypeCode: "SBLX_" + this.form.deviceTypeCode,
            deviceNote: this.form.deviceNote,
            createUser: sessionStorage.getItem('userName'),
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url: 'http://localhost:8080/deviceType/add',
            params: postData
          }).then(response => {
            console.log(response);
            // 根据返回AppResponse的code对话框显示成功/失败
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('保存失败');
            }
          }).catch(error => {
            console.log(error);
          });
          //返回
          this.$router.replace('/home/equipmentTypeList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      // 返回
      this.$router.replace('/home/equipmentTypeList')
    }
  }
}

</script>

