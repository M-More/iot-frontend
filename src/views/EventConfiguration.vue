<template>
  <div class="eveConfList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="eveInfoBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">事件配置列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>事件配置查询</p>
      <el-col :span="24">
        <div class="eveConfQuire-div">
          <el-form class="eveConfQuire-form">
            <el-row class="eveConfQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: bolder" :span="9">事件名称</el-col>
              <el-col style="font-weight: bolder;margin-left: 40px" :span="8" >事件级别</el-col>
            </el-row>
            <el-row class="eveConfQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item style="margin-right: 20px">
                  <el-input v-model="inputTitle" placeholder="请输入事件名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
<!--                  <el-input v-model="inputLevel" placeholder="请输入事件级别"></el-input>-->
                  <el-select v-model="inputLevel"
                             placeholder="选择事件级别">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
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
          <p>事件配置信息
          <el-button  type="success" @click="eveConfAdd" style="float:right; margin-right: 18px">新增</el-button>
          </p>
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
                    prop="eventName"
                    label="事件名称"
                >
                </el-table-column>
                <el-table-column
                    prop="eventLevel"
                    label="事件级别"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceTypeName"
                    label="设备类型"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="eveConfUpdateButt" type="text" @click="eveConfUpdate(scope.$index, scope.row)">修改信息</el-button>
                    <el-button type="text" @click="eveConfDel(scope.$index, scope.row)">删除</el-button>
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
            :page-sizes="[10, 20, 50]"
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
  name: "EventConfiguration",
  data() {
    return {
      options:[{value:'普通', label:"普通"},
        {value:'重要', label:"重要"}],
      eventName:"",
      eventLevel:"",
      deviceTypeName:"",
      notificationDescription:"",
      eveRule:"",
      eveConfCreateTime:'',
      eveConfUpdateTime:'',

      tableData: [],
      search: '',
      disablePage: false,
      total: 20,
      pageSize: 10,
      page: 1,

      indexTable: [{}],
      tabTable: [{}],

      dialogVisible: false,
      inputTitle: '',
      inputLevel: '',
      activeName: 'first',


      isSearch: true,
      toBeSearched: [],
    }
  },
  mounted() {
    this.fetchData(this.page,this.pageSize)
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
        url: 'http://localhost:8080/eventConfig/getAll',
        params: postData
      }).then(response =>
      {
        console.log(response.data);
        this.tableData = response.data.data;
        this.total=response.data.total;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    reflash(){
      //刷新
      this.$router.go(0);
      // console.log(this.tableData);
    },
    eveConfQuery(){
      //  查询
      let postData = {
        eventName:this.inputTitle,
        eventLevel: this.inputLevel,
        page:this.page,
        pageSize:this.pageSize,
      };
      console.log(postData)
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventConfig/getAll',
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
    eveConfUpdate(index, row){
      //  修改，跳转到修改页面
      console.log(index,row)
      sessionStorage.setItem('eventConfigId',row.eventConfigId);
      sessionStorage.setItem('eventName',row.eventName);
      sessionStorage.setItem('eventLevel',row.eventLevel);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('notificationDescription',row.notificationDescription);
      sessionStorage.setItem('alarmName',row.alarmName);
      this.$router.replace({path: '/home/eventConfList/eventConfUpdate'})
    },
    //  新增，跳转到新增页面
    eveConfAdd(){
      this.$router.replace({path: '/home/eventConfList/eventConfAdd'})
    },
    //  删除
    eveConfDel(index, row){
      // console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {
          eventConfigId: row.eventConfigId,
        };
        //let postData=row.eventConfigId;
        console.log(postData);
        this.axios({
          method: 'post',
          url:'http://localhost:8080/eventConfig/delete',
          params:postData
        }).then(response =>
        {
          console.log(response);
          this.reflash();
        }).catch(error =>
        {
          console.log(error);
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getPages() {
      this.axios.post('/rows').then(response =>
      {
        this.total = response.data;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    clickEventDialog(row){
      this.dialogVisible = true;
      console.log(row.creater)
      this.creater=row.creater
      this.createTime=row.createTime
      this.machineTime=row.machineTime
      this.machineRes=row.machineRes
      this.artificialPeo=row.artificialPeo
      this.artificialTime=row.artificialTime
      this.artificialRes=row.artificialRes
    },
    resetForm() {
      this.inputTitle='';
      this.inputLevel='';
    },
    searchFile(){
      if (this.isSearch) {
        this.toBeSearched = this.tableData
        this.isSearch = false
      }
      let data1 = this.toBeSearched.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(this.inputTitle)> -1
        })
      })
      this.tableData = data1.filter(data1 => {
        return Object.keys(data1).some(key => {
          return String(data1[key]).toLowerCase().indexOf(this.inputLevel)> -1
        })
      })
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
    handleCurrentChange(val) {
      //换页
      this.page = val;
      this.eveConfQuery(val,this.pageSize)
      console.log(`当前页: ${val}`);
    },
    handleChange(value) {
      console.log(value);
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



</style>