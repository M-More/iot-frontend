<template>
  <div class="eveConfList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="eveConfBreadcrumb">
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
              <el-col style="font-weight: 700" :span="8">事件名称</el-col>
              <el-col style="font-weight: 700" :span="8">事件级别</el-col>
            </el-row>
            <el-row class="eveConfQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入事件名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputLevel" placeholder="请输入事件级别"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item style="text-align: right;">
                  <el-button type="warning" @click="eveConfQuery">查询</el-button>
                  <el-button type="danger"  @click="resetForm" >重置</el-button>
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
        <el-col :span="8">
          <p>列表</p>
        </el-col>
        <el-col :span="8" >
          <el-button class="el-button1" type="success" @click="eveConfAdd">新增</el-button>
        </el-col>
        <el-col :span="8" >
          <el-button class="el-button1" type="success" @click="reflash">刷新</el-button>
        </el-col>
      </el-row>

      <div>
        <el-tabs style="background: white; line-height: 10px" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="事件配置信息" name="first">
            <template>
              <el-table
                  class="el-table-list"
                  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="eventName"
                    label="事件名称"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    prop="eventLevel"
                    label="事件级别"
                    width="100px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceTypeName"
                    label="设备类型"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="eveConfUpdateButt" type="text" @click="eveConfUpdate(scope.$index, scope.row)">修改信息</el-button>
                    <el-button type="text" @click="eveConfDel(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="信息风采" name="second">
            <!--            <template>-->
            <!--              <el-table-->
            <!--                  class="el-table-list"-->
            <!--                  :data="tableData"-->
            <!--                  :header-cell-style="headerStyle2"-->
            <!--                  :cell-style="cellStyle2"-->
            <!--                  row-style="height:10px"-->
            <!--                  style="width: 100%; font-size: 8px;">-->
            <!--                <el-table-column-->
            <!--                    prop="number"-->
            <!--                    label="序号"-->
            <!--                    width="50px"-->
            <!--                >-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="title"-->
            <!--                    label="标题"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="community"-->
            <!--                    label="所属社区"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="createTime"-->
            <!--                    label="创建时间"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="creater"-->
            <!--                    label="创建人"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="status"-->
            <!--                    label="状态"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                  <template slot-scope="item">-->
            <!--                    <span :class="item.row.status === '已发布' ? 'yifabu' :-->
            <!--                            (item.row.status === '未审核' || item.row.status === '已驳回' ? 'weishenheyibohui' : 'shenhezhong')">-->
            <!--                      {{item.row.status}}-->
            <!--                    </span>-->
            <!--                  </template>-->
            <!--                </el-table-column>-->
            <!--                <el-table-column-->
            <!--                    prop="action"-->
            <!--                    label="操作"-->
            <!--                    width="150px"-->
            <!--                    show-overflow-tooltip>-->
            <!--                  <template slot-scope="item">-->
            <!--                    <el-button-->
            <!--                        type="text" @click="audit"-->
            <!--                        v-if="item.row.status==='未审核' || item.row.status==='审核中'">-->
            <!--                      审核-->
            <!--                    </el-button>-->
            <!--                    <el-button-->
            <!--                        type="text" @click.native.prevent="clickEventDialog(item.row)">-->
            <!--                      流程信息-->
            <!--                    </el-button>-->

            <!--                    <el-dialog-->
            <!--                        class="tanchuang"-->
            <!--                        title="流程信息"-->
            <!--                        :visible.sync="dialogVisible"-->
            <!--                        :show-close="false"-->
            <!--                        :append-to-body="true"-->
            <!--                        width="60%">-->
            <!--                      <div>-->
            <!--                        <span>新增人： </span>-->
            <!--                        <span>{{creater}}</span>-->
            <!--                        <br>-->
            <!--                        <span>新增时间： </span>-->
            <!--                        <span>{{createTime}}</span>-->
            <!--                        <br>-->
            <!--                        <br>-->
            <!--                        <span>机审时间： </span>-->
            <!--                        <span>{{machineTime}}</span>-->
            <!--                        <br>-->
            <!--                        <span>机审结果： </span>-->
            <!--                        <span>{{machineRes}}-->
            <!--                          </span>-->
            <!--                        <br>-->
            <!--                        <br>-->
            <!--                        <span>人工审核人： </span>-->
            <!--                        <span>{{artificialPeo}}</span>-->
            <!--                        <br>-->
            <!--                        <span>人工审核时间： </span>-->
            <!--                        <span>{{artificialTime}}</span>-->
            <!--                        <br>-->
            <!--                        <span>人工结果： </span>-->
            <!--                        <span>{{artificialRes}}</span>-->
            <!--                        <br>-->
            <!--                      </div>-->
            <!--                      <span slot="footer" class="dialog-footer">-->
            <!--                        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>-->
            <!--                      </span>-->
            <!--                    </el-dialog>-->
            <!--                  </template>-->
            <!--                </el-table-column>-->
            <!--              </el-table>-->
            <!--            </template>-->
          </el-tab-pane>
          <el-tab-pane label="大屏通知" name="third"></el-tab-pane>
          <el-tab-pane label="大屏风采" name="fourth"></el-tab-pane>
          <el-tab-pane label="物业信息公开" name="fifth"></el-tab-pane>
        </el-tabs>
      </div>

      <!--分页 待修改-->
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
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
      eventConfigId:'',
      eventName:"",
      eventLevel:"",
      deviceTypeName:"",
      notificationDescription:"",
      alarmName:"",
      createUser:"",
      updateUser:"",
      createTime:'',
      updateTime:'',

      tableData: [],
      search: '',
      disablePage: false,

      indexTable: [{
      }],
      tabTable: [{
      }],
      tableData1: [{
        eveConfName: '供应商1',
        eveLevel: 1,
        equipType: '供应商1联系人1',
        action:'按钮',
      }, {
        eveConfName: '供应商2',
        eveLevel: 2,
        equipType: '供应商2联系人1',
        action:'按钮',
      },{
        eveConfName: '供应商3',
        eveLevel: 3,
        equipType: '供应商3联系人1',
        action:'按钮',
      },{
        eveConfName: '供应商4',
        eveLevel: 4,
        equipType: '供应商4联系人1',
        action:'按钮',
      },{
        eveConfName: '供应商5',
        eveLevel: 5,
        equipType: '供应商5联系人1',
        action:'按钮',
      }],
      dialogVisible: false,
      inputTitle: '',
      inputLevel: '',
      activeName: 'first',
      currentPage: 1,
      total:20,
      pageSize: 2, // 每页的数据条数
      isSearch: true,
      toBeSearched: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      //加载
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/eventConfig/getAll',
      }).then(response =>
      {
        console.log(response.data);
        this.tableData = response.data;
      }).catch(error =>
      {
        console.log(error);
      });
    },
    reflash(){
      //刷新
      this.$router.go(0);
      console.log("刷新");
    },
    eveConfQuery(){
      //  查询
      let postData = this.qs.stringify({
        eveConfName: this.search
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
    eveConfUpdate(index, row){
      //  修改，跳转到修改页面
      console.log(index,row)
      sessionStorage.setItem('eventConfigId',row.eventConfigId);
      sessionStorage.setItem('eventName',row.eventName);
      sessionStorage.setItem('eventLevel',row.eventLevel);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('notificationDescription',row.notificationDescription);
      sessionStorage.setItem('alarmName',row.alarmName);
      this.$router.replace({path: '/eventConfList/eventConfUpdate'})
    },
    eveConfAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/eventConfList/eventConfAdd'})
    },
    eveConfDel(index, row){
      //  删除
      // console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let postData = {
        //   eventConfigId: row.eventConfigId,
        // };
        let postData=row.eventConfigId;
        // console.log(postData);
        this.axios({
          method: 'post',
          url:'http://localhost:8080/eventConfig/delete',
          params:postData
        }).then(response =>
        {
          console.log(response);
          // this.reflash();
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
      return 'border: 1px solid lightgray; padding: 0'
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>

<style scoped>
/*面包屑样式：行高*/
.eveConfBreadcrumb{
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
.eveConfQuire-row-1{
  text-align: left !important;
  padding-left: 20px;
  line-height: 30px;
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
  height: 20px;
  padding-top: 30px;
  padding-right: 10px;
  /*padding-bottom: 10px;*/
  text-align: right;
}
.el-table-list{
  border-color: red;
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