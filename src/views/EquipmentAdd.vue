<template>
  <el-card class="box-card">
    <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>设备新增</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="boxContext">
        <div class="boxRight">
          <div class="xiangqing">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
              <el-form-item label="种类" prop="deviceSort">
                <el-select v-model="form.deviceSort" placeholder="选择种类">
                  <el-option
                      v-for="item in devicesortoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备类型" prop="deviceTypeName">
                <el-select v-model="form.deviceTypeName" placeholder="选择设备类型">
                  <el-option
                      v-for="item in optionsOfDev"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备品牌" prop="deviceBrand">
                <el-select v-model="form.deviceBrand" placeholder="选择设备品牌">
                  <el-option
                      v-for="item in optionsOfBrand"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备类号" prop="deviceModel">
                <el-input v-model="form.deviceModel" placeholder="设备类号"></el-input>
              </el-form-item>
              <el-form-item label="设备编号" prop="deviceNumber">
                <el-input v-model="form.deviceNumber"
                          onKeyUp="value=value.replace(/[\D]/g,'')">
                <template slot="prepend">S_</template>
                </el-input>
              </el-form-item>
              <el-form-item label="安装日期" prop="installDate">
                <el-date-picker
                    v-model="form.installDate" type="datetime" placeholder="选择日期时间"
                    format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude" placeholder="经度"
                          onkeyup="if(!/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/.test(this.value))
                          {alert('经度范围：-180~180（只支持保留小数点后六位）');this.value='';}">
                </el-input>
              </el-form-item>
              <el-form-item label="维度" prop="latitude">
                <el-input v-model="form.latitude" placeholder="纬度"
                          onkeyup="if(!/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/.test(this.value))
                          {alert('纬度范围：-90~90（只支持保留小数点后六位）');this.value='';}">
                </el-input>
              </el-form-item>
              <el-form-item label="安装地址" prop="installAddress">
                <el-input v-model="form.installAddress" placeholder="安装地址"></el-input>
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
      devicesortoptions:[{
        value:'视频设备',
        label:"视频设备"
      },{
        value:'非视频设备',
        label:"非视频设备"
      }],
      //读取设备类型
      optionsOfDev:[],
      //读取品牌
      optionsOfBrand:[],
      postData:[],
      form: {
        deviceSort: '',
        deviceBrand: '',
        deviceTypeName: '',
        deviceModel: '',
        deviceNumber: '',
        installDate: '',
        longitude: '',
        latitude: '',
        installAddress: '',
      },
      rules: {
        deviceSort: [
          { required: true, message: '请选择种类', trigger: 'blur' },
        ],
        deviceBrand: [
          { required: true, message: '请选择设备品牌', trigger: 'blur' }
        ],
        deviceTypeName: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        deviceModel: [
          { required: true, message: '请输入设备类号', trigger: 'blur' }
        ],
        deviceNumber: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        installDate: [
          { required: true, message: '请选择安装时间', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.fetchDev()
    this.selectBrandName()
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
    selectBrandName(){
      let postData={
        deviceTypeName:this.form.deviceTypeName
      };
      //读取品牌
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/supplier/getAllName',
        params: postData
      }).then(response => {
        console.log(response)
        let optionsList = [];
        for(let i=0;i<response.data.length;i++){
          let optionx={
            id:i,
            name:Object.values(response.data)[i],
          };
          console.log(Object.values(response.data)[i])
          optionsList.push(optionx)
        }
        console.log(optionsList)
        let optionsList1 = Array.from(new Set(optionsList))
        console.log(optionsList1)
        this.optionsOfBrand = optionsList;
      }).catch(error => {
        console.log(error);
      });
    },

    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData = {
            deviceSort: this.form.deviceSort,
            deviceBrand: this.form.deviceBrand,
            deviceTypeName: this.form.deviceTypeName,
            deviceModel: this.form.deviceModel,
            deviceNumber: "S_" + this.form.deviceNumber,
            installDate: this.form.installDate,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            installAddress: this.form.installAddress,
            createUser:sessionStorage.getItem('userName'),
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url: 'http://localhost:8080/deviceInfo/add',
            params: postData
          }).then(response => {
            console.log(response);
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('保存失败');
            }

          }).catch(error => {
            console.log(error);
          });

          // alert('保存成功！');
          this.$router.replace('/home/equipmentList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/home/equipmentList')
    }
  }
}
</script>
