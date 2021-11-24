<template>
  <div class="alarmList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="alertBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">告警列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>告警查询</p>
      <el-col :span="24">
        <div class="alarmQuire-div">
          <el-form class="alarmQuire-form">
            <el-row class="alertQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: 700" :span="6">告警名称</el-col>
              <el-col style="font-weight: 700" :span="6">告警编码</el-col>
              <el-col style="font-weight: 700" :span="6">告警级别</el-col>
            </el-row>
            <el-row class="alertQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入告警名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="inputCode" placeholder="请输入告警编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-select v-model="inputLevel" placeholder="选择事件级别">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item style="text-align: right;">
                  <el-button  type="warning" @click="alertQuery">查询</el-button>
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
        <p>
          告警信息
          <el-button  type="success" @click="AlertAdd" style="float:right; margin-right: 18px">新增</el-button>
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
                    prop="alarmName"
                    label="告警名称"
                >
                </el-table-column>
                <el-table-column
                    prop="alarmCode"
                    label="告警编码"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="alarmLevel"
                    label="告警类型"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceTypeName"
                    label="默认设备"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="alarmStatus"
                    label="状态"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="alertUpdateButt" type="text" @click="alertUpdate(scope.$index, scope.row)">修改信息</el-button>
                    <el-button type="text" @click="alertDel(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </el-tabs>
      </div>

      <!--分页 待修改-->
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[1,2,3,10,20,50]"
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
  name: "Alert",
  data() {
    return {
      // 警告下拉框数据
      options:[{
        value:'普通',
        label:"普通"
      },{
        value:'重要',
        label:"重要"
      }],
      // 表头字段信息
      alarmName:"",
      alarmCode:"",
      //告警类型
      alarmLevel:"",
      //设备类型
      deviceTypeName:"",
      //状态
      alarmStatus:"",
      createTime:"",
      updateTime:"",

      tableData: [],
      search: '',
      disablePage: false,
      total: 20,
      pageSize: 2,
      page: 1,  //当前页

      //搜索框默认值
      inputTitle: '',
      inputCode: '',
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
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/alarm/getAll',
        params: postData
      }).then(response =>
      {
        console.log(response.data.data);
        console.log(typeof response.data.data);
        console.log(response.data.data[0].createTime);
        this.tableData = response.data.data;

        this.total = response.data.total;
      }).catch(error =>
      {
        console.log(error);
      });
    },

    reflash(){
      //刷新页面
      this.$router.go(0);
    },

    alertQuery(){
      let postData = this.qs.stringify({
        // 待写参数


      });
      this.axios({
        method: 'post',
        url: '/supplierList',
        data: postData
      }).then(response =>
      {
        this.tableData = response.data;
        this.disablePage = true;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    alertUpdate(index, row){
      //  修改，跳转到修改页面

      // 传入修改表格参数
      sessionStorage.setItem('alarmName',row.alarmName);
      sessionStorage.setItem('alarmCode',row.alarmCode);
      sessionStorage.setItem('alarmLevel',row.alarmLevel);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('alarmStatus',row.alarmStatus);
      sessionStorage.setItem('ruleDescription',row.ruleDescription);

      // 跳转到修改页面
      this.$router.replace({path: '/alertList/alertUpdate'})
    },

    AlertAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/alertList/alertAdd'})
    },

    alertDel(index, row){
      //  删除
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {
          alarmCode: row.alarmCode,
        };
        this.axios({
          method: 'post',
          url:'http://localhost:8080/alarm/delete',
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

    resetForm() {
      this.inputTitle='';
      this.inputState='';
      this.inputLevel='';
    },

    headerStyle2({rowIndex}) {
      if (rowIndex === 0) {
        return 'border: 1px solid lightgray'
      }
      else
        return ''
    },

    cellStyle2(){
      return 'border: 1px solid lightgray; padding: 0'
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      //更改每页最大数量
      this.page = 1;
      this.pageSize = val;
      this.fetchData(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //换页
      this.page = val;
      this.fetchData(val,this.pageSize)
      console.log(`当前页: ${val}`);
    },

  }

}
</script>

<style scoped>
/*面包屑样式：行高*/
.alertBreadcrumb{
  height: 30px;
}
/*头*/
.el-header{
  text-align: left;
  line-height: 53px;
}
/*右侧页面整体样式*/
.alertList .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.alertList .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}
.alertList .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.alertList .el-dialog__body {
  height: 300px;
  font-size: 14px;
}
.alertList .el-row{
  line-height: 100px !important;
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
.alertQuire-row-1{
  text-align: left !important;
  padding-bottom: 8px;
  padding-left: 20px;
  line-height: 50px;
}
.alertQuire-row-2{
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
  height: 20px;
  padding-top: 30px;
  padding-right: 10px;
  /*padding-bottom: 10px;*/
  text-align: right;
}

.yifabu{
  color: limegreen;
}

.weishenheyibohui{
  color: yellow;
}

.shenhezhong{
  color: red;
}
</style>