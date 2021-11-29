<template>
  <div class="eveInfoDeviceDetail">
    <el-row class="el-row2">
      <p>设备信息</p>
      <el-col :span="24">
        <div>
          <el-form>
            <!--设备详情3*2行-->
            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="6">设备种类</el-col>
              <el-col style="font-weight: bolder" :span="6" >设备品牌</el-col>
              <el-col style="font-weight: bolder" :span="6" >设备类型</el-col>
              <el-col style="font-weight: bolder" :span="6" >设备编号</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="6" >
                <el-form-item>
                  <el-input v-model="deviceSort" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="deviceBrand" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="deviceTypeName" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="deviceNumber" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="6">安装时间</el-col>
              <el-col style="font-weight: bolder" :span="6" >安装地址</el-col>
              <el-col style="font-weight: bolder" :span="6" >经度</el-col>
              <el-col style="font-weight: bolder" :span="6" >纬度</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="installDate" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="installAddress" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="longitude" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="latitude" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="8">设备状态</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="createUser" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="deviceStatus" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--返回按钮-->
            <el-row class="eveConfQuire-row-1" :gutter="10">
              <el-col style="font-weight: bolder;text-align: right" :span="11" >
                <el-button type="button" @click="back">返回</el-button>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EventInfoDeviceDetail",
  data() {
    return {
      //只读
      readonly: true,
      //属性
      deviceSort:"",
      deviceBrand:"",
      deviceTypeName:"",
      deviceNumber:"",

      installDate:"",
      installAddress:"",
      longitude:"",
      latitude:"",

      deviceStatus:"",
      createUser:"",
    }
  },
  mounted() {
    this.fetchData()
  },
  methods:{
    //数据库读取设备信息
    fetchData(){
      this.deviceNumber=sessionStorage.getItem('deviceNumber')
      let postData={
        deviceNumber:this.deviceNumber
      };
      this.axios({
        method:'get',
        url:'http://localhost:8080/deviceInfo/getByNumber',
        params: postData
      }).then(response =>
      {
        console.log(response.data);
        this.deviceSort=response.data[0].deviceSort;
        this.deviceBrand=response.data[0].deviceBrand;
        this.deviceTypeName=response.data[0].deviceTypeName;

        this.installDate=response.data[0].installDate;
        this.installAddress=response.data[0].installAddress;
        this.longitude=response.data[0].longitude;
        this.latitude=response.data[0].latitude;

        this.deviceStatus=response.data[0].deviceStatus;
        this.createUser=response.data[0].createUser;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    //返回
    back(){
      this.$router.replace('/home/eventInfo/eventInfoDetail')
    },
  }
}
</script>

<style scoped>
.el-row2{
  width: 100%;
  padding: 10px 10px;
  background-color: white;
  margin: 0 0;
  border-radius: 10px;
  box-shadow: 0 0 10px #DCDFE6;
}
.el-row2 p{
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-bottom: 1px solid lightgray;
}
.eveConfQuire-row-1{
  text-align: left !important;
  padding-bottom: -8px;
  padding-left: 20px;
  line-height: 50px;
}
.eveConfQuire-row-2{
  padding: 10px;
}
</style>