<template>
  <div class="zuiwaiceng">
    <el-breadcrumb separator="/" class="toubu">
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
    </el-breadcrumb>

<!--    <el-table-->
<!--        class="shangmian"-->
<!--        :data="indexTable"-->
<!--        :header-cell-style="headerStyle"-->
<!--        :cell-style="cellStyle"-->
<!--        style="width: 100%">-->
<!--      <el-table-column label="审核查询">-->
<!--        <el-table-column label="标题">-->
<!--          <template slot="default">-->
<!--            <el-input-->
<!--                v-model="search"-->
<!--                size="medium"-->
<!--                placeholder="请输入标题"/>-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--        <el-table-column label="状态">-->
<!--          <template slot="default">-->
<!--            <el-cascader-->
<!--                v-model="value"-->
<!--                :options="options"-->
<!--                @change="handleChange"></el-cascader>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <el-row class="el-row2">
      <p>审核查询</p>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form class="demo-ruleForm">
            <el-row class="el-row-inner1">
              <el-col style="font-weight: 700" :span="8">
                标题
              </el-col>
              <el-col style="font-weight: 700" :span="8">
                状态
              </el-col>
            </el-row>
            <el-row class="el-row-inner2">
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-select v-model="inputState" placeholder="请选择状态">
                    <el-option style="margin-left: 10px" label="已发布" value="已发布"></el-option>
                    <el-option style="margin-left: 10px" label="审核中" value="审核中"></el-option>
                    <el-option style="margin-left: 10px" label="未审核" value="未审核"></el-option>
                    <el-option style="margin-left: 10px" label="已驳回" value="已驳回"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item style="text-align: right;">
                  <el-button class="el-button1" type="warning" @click="searchFile">查询</el-button>
                  <el-button class="el-button2" type="danger" @click="resetForm">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>

<!--    <el-table-->
<!--        :data="tabTable"-->
<!--        :header-cell-style="headerStyle"-->
<!--        :cell-style="cellStyle"-->
<!--        style="width: 100%">-->
    <div class="liebiao">
      <p>审核列表</p>
      <div>
        <el-tabs style="background: white; line-height: 10px" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="信息通知" name="first">
            <template>
              <el-table
                  class="el-table-biaoge"
                  :data="tableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="number"
                    label="序号"
                    width="50px"
                >
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="community"
                    label="所属社区"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="creater"
                    label="创建人"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="item">
                    <span :class="item.row.status === '已发布' ? 'yifabu' :
                            (item.row.status === '未审核' || item.row.status === '已驳回' ? 'weishenheyibohui' : 'shenhezhong')">
                      {{item.row.status}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="item">
                      <el-button
                          type="text" @click="audit"
                          v-if="item.row.status==='未审核' || item.row.status==='审核中'">
                        审核
                      </el-button>
                      <el-button
                          type="text" @click.native.prevent="clickEventDialog(item.row)">
                        流程信息
                      </el-button>
                      <el-dialog
                          class="tanchuang"
                          title="流程信息"
                          :visible.sync="dialogVisible"
                          :show-close="false"
                          :append-to-body="true"
                          width="60%">
                        <div>
                          <span>新增人： </span>
                          <span>{{creater}}</span>
                          <br>
                          <span>新增时间： </span>
                          <span>{{createTime}}</span>
                          <br>
                          <br>
                          <span>机审时间： </span>
                          <span>{{machineTime}}</span>
                          <br>
                          <span>机审结果： </span>
                          <span>{{machineRes}}
                          </span>
                          <br>
                          <br>
                          <span>人工审核人： </span>
                          <span>{{artificialPeo}}</span>
                          <br>
                          <span>人工审核时间： </span>
                          <span>{{artificialTime}}</span>
                          <br>
                          <span>人工结果： </span>
                          <span>{{artificialRes}}</span>
                          <br>
                        </div>
                        <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
                      </span>
                      </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="信息风采" name="second">
            <template>
              <el-table
                  class="el-table-biaoge"
                  :data="tableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="number"
                    label="序号"
                    width="50px"
                >
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="community"
                    label="所属社区"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="creater"
                    label="创建人"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="item">
                    <span :class="item.row.status === '已发布' ? 'yifabu' :
                            (item.row.status === '未审核' || item.row.status === '已驳回' ? 'weishenheyibohui' : 'shenhezhong')">
                      {{item.row.status}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="item">
                    <el-button
                        type="text" @click="audit"
                        v-if="item.row.status==='未审核' || item.row.status==='审核中'">
                      审核
                    </el-button>
                    <el-button
                        type="text" @click.native.prevent="clickEventDialog(item.row)">
                      流程信息
                    </el-button>

                    <el-dialog
                        class="tanchuang"
                        title="流程信息"
                        :visible.sync="dialogVisible"
                        :show-close="false"
                        :append-to-body="true"
                        width="60%">
                      <div>
                        <span>新增人： </span>
                        <span>{{creater}}</span>
                        <br>
                        <span>新增时间： </span>
                        <span>{{createTime}}</span>
                        <br>
                        <br>
                        <span>机审时间： </span>
                        <span>{{machineTime}}</span>
                        <br>
                        <span>机审结果： </span>
                        <span>{{machineRes}}
                          </span>
                        <br>
                        <br>
                        <span>人工审核人： </span>
                        <span>{{artificialPeo}}</span>
                        <br>
                        <span>人工审核时间： </span>
                        <span>{{artificialTime}}</span>
                        <br>
                        <span>人工结果： </span>
                        <span>{{artificialRes}}</span>
                        <br>
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
                      </span>
                    </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="大屏通知" name="third"></el-tab-pane>
          <el-tab-pane label="大屏风采" name="fourth"></el-tab-pane>
          <el-tab-pane label="物业信息公开" name="fifth"></el-tab-pane>
        </el-tabs>
      </div>
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
  name: "InformationCheck",
  data() {
    return {
      creater: "",
      createTime:"",
      machineTime:"",
      machineRes:"",
      artificialPeo:"",
      artificialTime:"",
      artificialRes:"",
      indexTable: [{
      }],
      tabTable: [{
      }],
      tableData: [{
        number:1,
        title:'五会起步村民自治工作法介绍',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'赵桥管理员',
        status:'已发布',
        action:'按钮',
        machineTime:"2021-11-10 17:00:00",
        machineRes:"通过",
        artificialPeo:"老总",
        artificialTime:"2021-11-10 19:00:00",
        artificialRes:"通过"
      }, {
        number:2,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'北京管理员',
        status:'审核中',
        action:'按钮',
        machineTime:"2021-11-10 17:00:00",
        machineRes:"通过",
        artificialPeo:"老总",
        artificialTime:"2021-11-10 19:00:00",
        artificialRes:"通过"
      },{
        number:3,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'上海管理员',
        status:'未审核',
        action:'按钮',
        machineTime:"2021-11-10 17:00:00",
        machineRes:"通过",
        artificialPeo:"老总",
        artificialTime:"2021-11-10 19:00:00",
        artificialRes:"通过"
    },{
        number:4,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2020-10-09 15:18:01',
        creater:'南京管理员',
        status:'已发布',
        action:'按钮',
        machineTime:"2021-11-10 17:00:00",
        machineRes:"通过",
        artificialPeo:"老大",
        artificialTime:"2021-11-10 19:00:00",
        artificialRes:"通过"
      },{
        number:5,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'广东管理员',
        status:'已发布',
        action:'按钮',
        machineTime:"2021-11-10 17:00:00",
        machineRes:"通过",
        artificialPeo:"主任",
        artificialTime:"2021-11-10 19:00:00",
        artificialRes:"通过"
      }],
      dialogVisible: false,
      search: '',
      inputTitle: '',
      inputState: '',
      activeName: 'first',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // value: [],
      // options: [{
      //   value: 'weishenhe',
      //   label: '未审核',
      // }, {
      //   value: 'shenhezhong',
      //   label: '审核中',
      // }, {
      //   value: 'yifabu',
      //   label: '已发布',
      // }, {
      //   value: 'yibohui',
      //   label: '已驳回',
      // }],
      isSearch: true,
      toBeSearched: [],
    }
  },
  methods: {
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
    },
    audit(){
      this.$router.replace('/auditingdetail')
    }
  }

}
</script>

<style scoped>
.toubu{
  height: 30px;
}

.el-header{
  text-align: left;
  line-height: 53px;
}

.shangmian{
  border-radius: 20px;
}

.liebiao{
  height: 450px;
  padding-top: 5px;
  padding-left: 5px;
  border-radius: 20px;
  background: white;
  margin-top: 20px;
}

.el-row2 p{
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-bottom: 1px solid lightgray;
}

.liebiao p{
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
.zuiwaiceng .el-dialog__title {
  text-align: left;
  font-size: 20px;
}

.zuiwaiceng .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}

.zuiwaiceng .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}

.zuiwaiceng .el-dialog__body {
  height: 300px;
  font-size: 14px;
}

.el-row2{
  width: 100%;
  padding: 10px 10px;
  background-color: white;
  margin: 0 0;
  border-radius: 10px;
  box-shadow: 0 0 10px #DCDFE6;
}

.el-row-inner1{
  text-align: left;
  padding-bottom: 8px;
  padding-left: 20px;
  line-height: 50px;
}

/*.row2-title{*/
/*  height: 20px;*/
/*  padding-bottom: 20px;*/
/*  padding-left: 30px;*/
/*  margin-bottom: 10px;*/
/*  border-bottom: #DCDFE6 solid 1px;*/
/*}*/


</style>
