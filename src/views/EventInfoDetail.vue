<template>
  <div class="eveInfoDetail">
    <!--事件信息部分-->
    <el-row class="el-row2">
      <p>事件信息</p>
      <el-col :span="24">
        <div class="eveConfQuire-div">
          <el-form class="eveConfQuire-form">

            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="8">事件Id</el-col>
              <el-col style="font-weight: bolder" :span="8" >事件名称</el-col>
              <el-col style="font-weight: bolder" :span="8" >事件状态</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="8" >
                <el-form-item>
                  <el-input v-model="eventInfoId" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="eventName" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="eventInfoStatus" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="8">事件来源</el-col>
              <el-col style="font-weight: bolder" :span="8" >告警次数</el-col>
              <el-col style="font-weight: bolder" :span="8" >事件发生时间</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="eventInfoResource" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="alarmFrequency" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="eventInfoOccurTime" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="8">事件描述</el-col>
            </el-row>

            <el-row class="eveConfQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="24">
                <el-form-item style="margin-right: 20px">
                  <el-input v-model="eventInfoDescription" :disabled="readonly"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </el-col>
    </el-row>

    <!--设备信息部分-->
    <div class="detailList" id="devList">
      <p>设备列表</p>
      <div>
        <el-tabs style="background: white; line-height: 10px;" type="card">
          <template>
            <el-table
                class="el-table-list"
                :data="tableData"
                :header-cell-style="headerStyle2"
                :cell-style="cellStyle2"
                row-style="height:10px"
                style="width: 100%; font-size: 8px;">
              <el-table-column
                  prop="deviceNumber"
                  label="设备编号"
              >
              </el-table-column>
              <el-table-column
                  prop="deviceTypeName"
                  label="设备类型"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="deviceStatus"
                  label="设备状态"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="addressDescription"
                  label="地址描述"
                  show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                  prop="action"
                  label="操作"
                  align="center"
                  show-overflow-tooltip>
                <template>
                  <el-button class="eventInfoDetailButt" type="success" @click="deviceInfoDetail">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tabs>
      </div>

    </div>

    <!--事件日志部分-->
    <div class="detailList" id="InfoDia">
      <!--事件日志-->
        <p>事件日志</p>
        <div>
          <el-tabs style="background: white; line-height: 10px" v-model="activeName" type="card" @tab-click="handleClick">
            <template>
              <el-table
                  class="el-table-list"
                  :data="logTableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="date"
                    label="日期"
                >
                </el-table-column>
                <el-table-column
                    prop="processStatus"
                    label="状态"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="staff"
                    label="人员"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    show-overflow-tooltip>
                </el-table-column>

              </el-table>
            </template>
          </el-tabs>
        </div>

      <!--按钮-->
      <el-row class="eveConfQuire-row-1" :gutter="10">
        <el-col style="font-weight: bolder;text-align: right" :span="11" >
          <el-button type="button" @click="back">返回</el-button>
        </el-col>

        <el-col style="font-weight: bolder;text-align: left" :span="8">
          <!--事件处理状态绑定是否显示-->
          <el-button type="success" v-if="orderBuVis" @click="eveOrder">接单</el-button>
        </el-col>

        <el-col class="div-eveDeal" style="font-weight: bolder;text-align: left" :span="8">
          <div>
            <!--事件处理状态绑定是否显示-->
            <el-button type="success" v-if="dealBuVis" @click="eveDeal">处理</el-button>

            <el-dialog
                :visible.sync="dialogVisible"
                width="30%">
              <el-input style="width: 100%"
                        @input="change($event)"
                        type="textarea"
                        placeholder="请输入处理意见"
                        v-model="dealComment"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitOp">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "EventInfoDetail",
  data() {
    return{
      //属性：事件、设备、日志
      eventInfoId:"",
      eventName:"",
      eventInfoStatus:"",
      eventInfoResource:"",
      alarmFrequency:"",
      eventInfoOccurTime:"",
      eventInfoDescription:"",

      deviceNumber:"",
      deviceTypeName:"",
      deviceStatus:"",
      addressDescription:"",

      eveDiaDate:"",
      eveDiaSta:"",
      eveDiaPer:"",
      eveDiaOpt:"",

      date:"",
      processStatus:"",
      staff:"",
      action:"",

      //按钮显示属性
      orderBuVis:false,
      dealBuVis:false,
      dealBuAble:true,
      //输入框只读属性
      readonly: true,
      //列表内容*2
      tableData: [],
      logTableData:[],
      //分页
      total: 20,
      pageSize: 10,
      page: 1,
      //处理意见弹窗
      dialogVisible: false,
      dealComment:'',
    }
  },
  mounted() {
    this.loadData()
    this.fetchLog()
  },
  methods: {
    //缓存读取事件与设备信息，同时根据事件状态决定三个按钮的显示与否
    loadData(){
      this.eventInfoId=sessionStorage.getItem('eventInfoId')
      this.eventName=sessionStorage.getItem('eventName')
      this.eventInfoStatus=sessionStorage.getItem('eventInfoStatus')
      this.eventInfoResource=sessionStorage.getItem('eventInfoResource')
      this.alarmFrequency=sessionStorage.getItem('alarmFrequency')
      this.eventInfoOccurTime=sessionStorage.getItem('eventInfoOccurenceTime')
      this.eventInfoDescription=sessionStorage.getItem('eventInfoDescription')
      this.deviceNumber=sessionStorage.getItem('deviceNumber')
      this.deviceTypeName=sessionStorage.getItem('deviceTypeName')
      this.deviceStatus=sessionStorage.getItem('deviceStatus')
      this.addressDescription=sessionStorage.getItem('addressDescription')
      let tableData1={deviceNumber: this.deviceNumber,
        deviceTypeName:this.deviceTypeName,
        deviceStatus:this.deviceStatus,
        addressDescription:this.addressDescription
      }
      console.log("deviceNumber："+this.alarmFrequency)
      let Table=[]
      Table.push(tableData1)
      this.tableData=Table

      // console.log(typeof this.eventInfoStatus)
      if(this.eventInfoStatus=="未处理"){
        // 状态是未处理，
        // 显示接单，隐藏处理
        this.orderBuVis=true
        this.dealBuVis=false
        console.log("未处理")
      }else if(this.eventInfoStatus=="处理中"){
        // 状态是处理中且当前用户（网页）与数据库中UpdateUser一致
        if(sessionStorage.getItem('userName')==sessionStorage.getItem('updateUser')){
          this.orderBuVis=false
          this.dealBuVis=true
        }
      }
      else{
        // 状态是已处理
        this.orderBuVis=false
        this.dealBuVis=false
        console.log("已处理")
      }
      console.log(sessionStorage.getItem('userName'))
      console.log(sessionStorage.getItem('updateUser'))
    },
    //跳转查看设备详情
    deviceInfoDetail(){
      this.$router.replace({path: '/home/eventInfo/eventInfoDetail/eventInfoDeviceDetail'})
    },
    // 读取数据库日志
    fetchLog(){
      let postData={
        eventInfoId:this.eventInfoId
      }
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventInfo/getLog',
        params: postData
      }).then(response =>
      {
        let tableTemp=response.data;
        for(let i=0;i<tableTemp.length;i++){
          let yearStr=tableTemp[i].date.slice(0,10);
          let timeStr=tableTemp[i].date.slice(11,19);
          tableTemp[i].date=yearStr+' '+timeStr;
        }
        console.log(tableTemp);
        this.logTableData = tableTemp;

      }).catch(error =>
      {
        console.log(error);
      });
    },
    //接单点击方法
    eveOrder(){
      this.eventInfoStatus="处理中";
      let postData={
        eventInfoId:this.eventInfoId,
        updateUser:sessionStorage.getItem('userName'),
        eventInfoStatus:this.eventInfoStatus,
        deviceStatus:"异常"
      };
      this.axios({
        method: 'post',
        url:'http://localhost:8080/eventInfo/update',
        params:postData
      }).then(response=>
      {
        console.log(response);
        this.$router.replace({path: '/home/eventInfo'})
      }).catch(error =>
      {
        console.log(error);
      });
    },
    //打开处理弹窗（输入处理意见）
    eveDeal(){
      this.dialogVisible=true;
    },
    //提交处理意见
    submitOp(){
      let postData={
        opinion:this.dealComment,
        eventInfoId:sessionStorage.getItem('eventInfoId'),
        updateUser:sessionStorage.getItem('userName'),
        eventInfoStatus:"已处理",
        deviceStatus:"正常",
        deviceNumber:this.deviceNumber
      };
      this.axios({
        method: 'post',
        url:'http://localhost:8080/eventInfo/update',
        params:postData
      }).then(response=>
      {
        console.log(postData);
        console.log(response);
        this.dialogVisible=false;
        this.$router.replace({path: '/home/eventInfo'})
      }).catch(error =>
      {
        console.log(error);
      });

    },
    // 渲染太深input无法输入：
    // 强制刷新可解决
    change(e){
      console.log(e);
      this.$forceUpdate();
    },
    //样式函数
    headerStyle({rowIndex}) {
      if (rowIndex === 0) {
        return 'line-height:10px; background: white; '
      } else if (rowIndex === 1){
        return 'line-height:10px; background: white; border: 0'
      }
      else
        return ''
    },
    headerStyle2({rowIndex}) {
      if (rowIndex === 0) {
        return 'border: 1px solid lightgray'
      }
      else
        return ''
    },
    cellStyle(){
      return 'border: 0'
    },
    cellStyle2(){
      return 'border: 1px solid lightgray ; padding: 0'
    },
    //更改每页最大数量
    handleSizeChange(val) {
      this.page = 1;
      this.pageSize = val;
      this.fetchData(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    //换页
    handleCurrentChange(val) {
      this.page = val;
      this.fetchData(val,this.pageSize)
      console.log(`当前页: ${val}`);
    },
    //返回
    back() {
      this.$router.replace('/home/eventInfo')
    }
  }
}
</script>

<style scoped>
/*面包屑样式：行高*/
.eveInfoBreadcrumb{
  height: 30px;
}
/*头*/
.el-header{
  text-align: left;
  line-height: 53px;
}
/*弹窗整体样式*/
.eveInfoDetail .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.eveInfoDetail .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
  text-align: left;
}
.eveInfoDetail .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.eveInfoDetail .el-dialog__body {
  height: 300px;
  font-size: 14px;
}
/*事件信息部分*/
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
/*事件信息部分内容：字段、信息、按钮*/
.eveConfQuire-row-1{
  text-align: left !important;
  padding-bottom: -8px;
  padding-left: 20px;
  line-height: 50px;
}
.eveConfQuire-row-2{
  padding: 10px;
}
/*设备列表*/
#devList{
  height: 200px;
}
/*（设备、日志）列表样式*/
.detailList{
  height: 450px;
  padding-top: 5px;
  padding-left: 5px;
  border-radius: 20px;
  background: white;
  margin-top: 20px;
}
.detailList p{
  padding-left: 8px;
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}



</style>