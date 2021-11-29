<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备类型修改</el-breadcrumb-item>
      <el-breadcrumb-item>设备类型列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    表单-->
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
      //发送请求初始值
      postData:[],
      //下拉框请求初始值
      optionsOfDev:[],
      optionsOfRul:[],
      //表单 给prop用
      form: {
        deviceTypeName: sessionStorage.getItem('deviceTypeName'),
        deviceTypeCode: sessionStorage.getItem('deviceTypeCode').slice(5),
        deviceNote: sessionStorage.getItem('deviceNote'),
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
  methods:{
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
            updateUser: sessionStorage.getItem('userName'),
          };
          console.log(postData);
          this.axios({
            method: 'post',
            url: 'http://localhost:8080/deviceType/update',
            params: postData
          }).then(response => {
            // 根据返回AppResponse的code对话框显示成功/失败
            if (response.data.code === 0) {
              alert('修改成功！');
            }
            if (response.data.code === 9) {
              alert('修改失败');
            }
            console.log(response);
          }).catch(error => {
            console.log(error);
          });
          this.$router.replace('/home/equipmentTypeList');
        }else {
          console.log('error submit!!');
          return false;
        }
      });
   },
    back(){
      //返回
      this.$router.replace('/home/equipmentTypeList')
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
