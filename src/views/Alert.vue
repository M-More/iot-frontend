<template>
  <div class="alertList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="alertBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">告警列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>告警查询</p>
      <el-col :span="24">
        <div class="alertQuire-div">
          <el-form class="alertQuire-form">
            <el-row class="alertQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: 700" :span="6">
                告警名称
              </el-col>
              <el-col style="font-weight: 700" :span="6">
                告警编码
              </el-col>
              <el-col style="font-weight: 700" :span="6">
                告警级别
              </el-col>
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
                  <el-input v-model="inputTitle" placeholder="请输入告警编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入告警级别"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item style="text-align: right;">
                  <el-button class="el-button1" type="warning" @click="alertQuery">查询</el-button>
                  <el-button class="el-button2" type="danger"  @click="resetForm" >重置</el-button>
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
          <el-button class="el-button1" type="success" @click="alertAdd">新增</el-button>
        </el-col>
        <el-col :span="8" >
          <el-button class="el-button1" type="success" @click="reflash">刷新</el-button>
        </el-col>
      </el-row>

      <div>
        <el-tabs style="background: white; line-height: 10px" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="告警规则信息" name="first">
            <template>
              <el-table
                  class="el-table-list"
                  :data="tableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="alertName"
                    label="告警名称"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    prop="alertId"
                    label="告警编码"
                    width="100px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="alertType"
                    label="告警类型"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="alertDefEquip"
                    label="默认设备"
                    width="150px"
                    show-overflow-tooltip><!--原createTime-->
                </el-table-column>
                <el-table-column
                    prop="alertDefSwitch"
                    label="默认开关"
                    width="150px"
                    show-overflow-tooltip><!--原creater-->
                </el-table-column>
                <el-table-column
                    prop="alertCreateTime"
                    label="创建时间"
                    width="150px"
                    show-overflow-tooltip><!--原creater-->
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="alertUpdateButt" type="text" @click="alertUpdate">修改信息</el-button>
                    <el-button type="text" @click="alertDel(scope.$index, scope.row)">删除</el-button>
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
            :current-page="currentPage4"
            :page-sizes="[1, 2, 3]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="4">
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
      alertName:"",
      alertId:"",
      alertDefEquip:"",
      alertType:"",
      alertDefSwitch:"",
      alertCreateTime:"",
      alertUpdateTime:"",
      alertStatus:'',
      alertRuleExpla:'',

      // tableData: [],
      search: '',
      disablePage: false,
      total: 0,
      pageSize: 5,
      currentPage: 1,

      indexTable: [{
      }],
      tabTable: [{
      }],
      tableData: [{
        alertName: '供应商1',
        alertId: 1,
        alertType: '供应商1联系人1',
        alertDefEquip: '13212398765',
        alertDefSwitch: '地址1',
        alertCreateTime:'已发布',
        action:'按钮',
      }, {
        alertName: '供应商2',
        alertId: 2,
        alertType: '供应商2联系人1',
        alertDefEquip: '13212398765',
        alertDefSwitch: '地址2',
        alertCreateTime:'审核中',
        action:'按钮',
      },{
        alertName: '供应商3',
        alertId: 3,
        alertType: '供应商3联系人1',
        alertDefEquip: '13212398765',
        alertDefSwitch: '地址3',
        alertCreateTime:'未审核',
        action:'按钮',
      },{
        alertName: '供应商4',
        alertId: 4,
        alertType: '供应商4联系人1',
        alertDefEquip: '13212398765',
        alertDefSwitch: '地址4',
        alertCreateTime:'已发布',
        action:'按钮',
      },{
        alertName: '供应商5',
        alertId: 5,
        alertType: '供应商5联系人1',
        alertDefEquip: '13212398765',
        alertDefSwitch: '地址5',
        alertCreateTime:'已发布',
        action:'按钮',
      }],
      dialogVisible: false,
      inputTitle: '',
      inputState: '',
      activeName: 'first',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      isSearch: true,
      toBeSearched: [],
    }
  },
  methods: {
    reflash(){
      //刷新
      this.$router.go(0);
    },
    alertQuery(){
      //  查询
      let postData = this.qs.stringify({
        alertName: this.search
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
    alertUpdate(){
      //  修改，跳转到修改页面
      this.$router.replace({path: '/supplierList/inform'})
    },
    alertAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/supplierList/inform'})
    },
    alertDel(index, row){
      //  删除
      console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = this.qs.stringify({
          alertId: row.alertId,
        });
        this.axios({
          method: 'post',
          url:'/delete',
          data:postData
        }).then(response =>
        {
          this.getPages();
          this.currentPage = 1;
          this.axios.post('/page').then(response =>
          {
            this.tableData = response.data;
          }).catch(error =>
          {
            console.log(error);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          console.log(response);
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
      this.inputState='';
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
          return String(data1[key]).toLowerCase().indexOf(this.inputState)> -1
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
    },
    handleCurrentChange(val) {
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