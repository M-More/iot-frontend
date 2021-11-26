<template>
  <div class="eveConfList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="eveInfoBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">事件监控列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--事件数量-->
    <el-row class="el-row2">
      <p>事件数量</p>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="div-1" id="div-1-eveSum">
            <div class="div-2">
              {{this.total}}
              <p>事件总数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="div-1" id="div-1-eveDealed">
            <div class="div-2">
              {{this.eventDone}}
              <p>已处理事件</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="div-1" id="div-1-eveDealing">
            <div class="div-2">
              {{this.eventDoing}}
              <p>处理中事件</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="div-1" id="div-1-eveUndealed">
            <div class="div-2">
              {{this.eventToDo}}
              <p>未处理事件</p>
            </div>
          </div>
        </el-col>

      </el-row>
    </el-row>

    <!--上方筛选部分-->
    <el-row class="el-row2">
      <p>事件筛选</p>
      <el-col :span="24">
        <div class="eveConfQuire-div">
          <el-form class="eveConfQuire-form">
            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="8">事件Id</el-col>
              <el-col style="font-weight: bolder" :span="8" >事件名称</el-col>
            </el-row>
            <el-row class="eveConfQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item style="margin-right: 20px">
                  <el-input v-model="inputId" placeholder="请输入事件Id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputName" placeholder="请输入事件名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item style="text-align: right;">
                  <el-button  type="warning" @click="eveConfQuery">查询</el-button>
                  <el-button  type="danger"  @click="resetForm" >重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <!--下方列表信息部分-->
    <div class="detailList">
      <el-row>
        <p>事件列表</p>
      </el-row>

      <div>
        <el-tabs style="background: white; line-height: 10px" v-model="activeName" type="card" @tab-click="handleClick">
          <template>
            <el-table
                class="el-table-list"
                :data="tableData"
                :header-cell-style="headerStyle2"
                :cell-style="cellStyle2"
                row-style="height:10px"
                style="width: 100%; font-size: 8px;">
              <el-table-column
                  prop="eventInfoId"
                  label="事件Id"
              >
              </el-table-column>
              <el-table-column
                  prop="eventName"
                  label="事件名称"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="deviceNumber"
                  label="关联设备"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="addressDescription"
                  label="地址描述"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="eventInfoOccurenceTime"
                  label="事件发生时间"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="eventInfoStatus"
                  label="事件状态"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="eventLevel"
                  label="事件等级"
                  show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                  prop="action"
                  label="操作"
                  align="center"
                  show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button class="eventInfoDetailButt" type="success" @click="eventInfoDetail(scope.$index, scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tabs>
      </div>

      <!--分页-->
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[1,2,3, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=this.total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  data() {
    return {
      options:[{value:'普通', label:"普通"},
        {value:'重要', label:"重要"}],
      eventInfoId:"",
      eventName:"",
      deviceNumber:"",
      addressDescription:"",
      eventInfoOccurenceTime:"",
      eventInfoStatus:"",
      eventInfoResource:"",
      alarmFrequencey:"",
      eventInfoDescription:"",
      eventLevel:'',
      deviceTypeName:"",
      deviceStatus:"",

      tableData: [],
      search: '',
      disablePage: false,
      total: 20,
      pageSize: 10,
      page: 1,

      inputId: '',
      inputName: '',
      activeName: 'first',

      eventSum:'',
      eventDone:'',
      eventDoing:'',
      eventToDo:'',


      isSearch: true,
      toBeSearched: [],
    }
  },
  mounted() {
    this.fetchData(this.page,this.pageSize)
    this.fetchTableTitle()
  },
  methods: {
    //读表
    fetchData(page,pageSize){
      let postData={
        page: page,
        pageSize: pageSize
      };
      console.log(postData);
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventInfo/getAll',
        params: postData
      }).then(response =>
      {
        // console.log(response.data.data[0].alarmFrequencey);
        this.tableData = response.data.data;
        this.total=response.data.total;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    //读表头（xx数量等）
    fetchTableTitle(){
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventInfo/getEventStat',
      }).then(response =>
      {
        this.eventSum=response.data.total;
        this.eventDone=response.data.done;
        this.eventDoing=response.data.doing;
        this.eventToDo=response.data.todo;
      }).catch(error =>
      {
        console.log(error);
      });
    },

    //刷新
    reFlash(){
      this.$router.go(0);
    },
    //查询
    eveConfQuery(){
      let postData = {
        page:this.page,
        pageSize:this.pageSize,
        eventInfoId:this.inputId,
        eventName: this.inputName,
      };
      console.log(postData)
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventInfo/getAll',
        params: postData
      }).then(response =>
      {
        this.tableData = response.data.data;
        this.total=response.data.total
        console.log(response.data);
        console.log("查询成功");
      }).catch(error =>
      {
        console.log(error);
      });
    },
    //  修改，跳转到详情页面
    eventInfoDetail(index, row){
      console.log(index,row)
      sessionStorage.setItem('eventInfoId',row.eventInfoId);
      sessionStorage.setItem('eventName',row.eventName);
      sessionStorage.setItem('eventInfoStatus',row.eventInfoStatus);
      sessionStorage.setItem('eventInfoResource',row.eventInfoResource);
      sessionStorage.setItem('alarmFrequency',row.alarmFrequencey);
      sessionStorage.setItem('eventInfoOccurenceTime',row.eventInfoOccurenceTime);
      sessionStorage.setItem('eventInfoDescription',row.eventInfoDescription);
      sessionStorage.setItem('eventLevel',row.eventLevel);

      sessionStorage.setItem('deviceNumber',row.deviceNumber);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('deviceStatus',row.deviceStatus);
      sessionStorage.setItem('addressDescription',row.addressDescription);
      sessionStorage.setItem('updateUser',row.updateUser);

      // console.log("告警次数："+sessionStorage.getItem('alarmFrequency'))
      this.$router.replace({path: '/home/eventInfo/eventInfoDetail'})
    },
    //重置
    resetForm() {
      this.inputId='';
      this.inputName='';
    },

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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      //更改每页最大数量
      this.page = 1;
      this.pageSize = val;
      this.eveConfQuery(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    //换页
    handleCurrentChange(val) {

      this.page = val;
      this.eveConfQuery(val,this.pageSize)
      console.log(`当前页: ${val}`);
    },
    handleChange(value) {
      console.log(value);
    },
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
/*右侧页面整体样式*/
.eveConfList .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.eveConfList .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}
.eveConfList .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.eveConfList .el-dialog__body {
  height: 300px;
  font-size: 14px;
}
.eveConfList .el-row{
  line-height: 40px !important;
}
/*查询部分*/
.el-row2{
  width: 100%;
  padding: 10px 10px;
  background-color: white;
  margin: 0 0;
  border-radius: 10px;
  box-shadow: 0 0 10px #DCDFE6;
  margin-bottom: 10px;
}
.el-row2 p{
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-bottom: 1px solid lightgray;
}
/*查询不分内容：字段、信息、按钮*/
.eveConfQuire-row-1{
  text-align: left !important;
  padding-bottom: -8px;
  padding-left: 20px;
  line-height: 50px;
}
.eveConfQuire-row-2{
  padding: 10px;
}


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
.block{
  background: white;
  height: 40px;
  padding-top: 30px;
  padding-right: 10px;
  /*padding-bottom: 10px;*/
  text-align: right;
}

.div-1{
  height: 152px;
  background-color: grey;
  border-radius: 4px;
  /*background-image: url("../assets/eventSum.png");*/
  background-repeat: no-repeat;
  background-size: 150px;
  position: relative;
}
#div-1-eveSum{
  background-image: url("../assets/后台-事件总数.png");
  background-color: #389fe3;
  background-size: 155px;
}
#div-1-eveDealed{
  background-image: url("../assets/后台-已处理.png");
  background-color: rgb(103,194,58);
}
#div-1-eveDealing{
  background-image: url("../assets/后台-待处理.png");
  background-color: rgb(230,162,60);
}
#div-1-eveUndealed{
  background-image: url("../assets/后台-未处理.png");
  background-color: rgb(245,108,108);
}
.div-2{
  height: 40px;
  position: absolute;
  top:30%;
  right:8%;
  color: white;
  font-size: 18px;
}

.div-2 p{
  text-align: center;
  height: 20px;
  line-height: 20px;
  border-bottom: 0;
}




</style>