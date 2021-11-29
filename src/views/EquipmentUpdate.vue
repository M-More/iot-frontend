<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备修改</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单-->
    <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude"
                  placeholder="经度"
                  onkeyup="if(!/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/.test(this.value))
                          {alert('经度范围：-180~180（只支持保留小数点后六位）');this.value='';}"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="form.latitude"
                  placeholder="纬度"
                  onkeyup="if(!/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/.test(this.value))
                          {alert('纬度范围：-90~90（只支持保留小数点后六位）');this.value='';}"></el-input>
      </el-form-item>

      <!-- 底部按钮-->
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
      //返回值初始为空
      postData: [],
      //下拉框初始为空 后续渲染
      optionsOfDev: [],
      optionsOfRul: [],
      //表单
      form: {
        longitude: sessionStorage.getItem('longitude'),
        latitude: sessionStorage.getItem('latitude')
      },
      //必填规则
      rules: {
        longitude: [
          {required: true, message: '请输入经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请输入纬度', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    save(formName) {
      //保存
      this.$refs[formName].validate((valid) => {
        //必填项校验是否为空
        if (valid) {
          //传参
          let postData = {
            deviceNumber: sessionStorage.getItem('deviceNumber'),
            deviceSort: sessionStorage.getItem('deviceSort'),
            deviceBrand: sessionStorage.getItem('deviceBrand'),
            deviceTypeName: sessionStorage.getItem('deviceTypeName'),
            deviceModel: sessionStorage.getItem('deviceModel'),
            installDate: sessionStorage.getItem('installDate'),
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            installAddress: sessionStorage.getItem('installAddress'),
            deviceStatus: sessionStorage.getItem('deviceStatus'),
            updateUser: sessionStorage.getItem('userName'),
            deviceName: sessionStorage.getItem('deviceTypeName') + sessionStorage.getItem('deviceNumber')
          };
          console.log(postData);
          this.axios({
            method: 'post',
            url: 'http://localhost:8080/deviceInfo/update',
            params: postData
          }).then(response => {
            //根据返回AppResponse的code 对话框提示成功/失败
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('修改失败');
            }
            console.log(response);
          }).catch(error => {
            console.log(error);
          });
          //返回
          this.$router.replace('/home/equipmentList');
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back(){
      //返回
      this.$router.replace('/home/equipmentList')
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
