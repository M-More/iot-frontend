<template>
  <div class="zuiwaiceng">
    <el-breadcrumb separator="/" class="toubu">
      <el-breadcrumb-item :to="{ path: '/' }">信息审核</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息审核</a></el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
        class="shangmian"
        :data="indexTable"
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        style="width: 100%">
      <el-table-column label="审核查询">
        <el-table-column label="标题">
          <template slot="default">
            <el-input
                v-model="search"
                size="medium"
                placeholder="输入关键字搜索"/>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot="default">
            <el-input
                v-model="search"
                size="medium"
                placeholder="输入关键字搜索"/>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

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
                  :data="tableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:20px"
                  style="width: 100%;font-size: 8px">
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
                            (item.row.status === '未审核' || '已驳回' ? 'weishenheyibohui' : 'shenhezhong')">
                      {{item.row.status}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template>
                    <el-button
                        type="text" @click="dialogVisible = true">
                      流程信息
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="信息风采" name="second"></el-tab-pane>
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
      <el-dialog
          class="tanchuang"
          title="流程信息"
          :visible.sync="dialogVisible"
          :show-close="false"
          width="60%">
        <div>
          <span>新增人： </span>
          <!--          <span>{{ scope.row.createPeople }}</span>-->
          <br>
          <span>新增时间： </span>
          <!--          <span>{{scope.row.createTime}}</span>-->
          <br>
          <br>
          <span>机审时间： </span>
          <!--          <span>{{scope.row.machineTime}}</span>-->
          <br>
          <span>机审结果： </span>
          <!--          <span>{{scope.row.machineRes}}</span>-->
          <br>
          <br>
          <span>人工审核人： </span>
          <br>
          <span>人工审核时间： </span>
          <br>
          <span>人工结果： </span>
          <br>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>

    </div>



  </div>
</template>

<script>
export default {
  name: "InformationCheck",
  data() {
    return {
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
        action:'按钮'
      }, {
        number:2,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'赵桥管理员',
        status:'已发布',
        action:'按钮'
      },{
        number:3,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'赵桥管理员',
        status:'已发布',
        action:'按钮'
    },{
        number:4,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'赵桥管理员',
        status:'已发布',
        action:'按钮'
      },{
        number:5,
        title:'舞会起步',
        community:'赵桥',
        createTime:'2019-10-09 15:18:01',
        creater:'赵桥管理员',
        status:'已发布',
        action:'按钮'
      }],
      dialogVisible: false,
      search: '',
      activeName: 'first',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
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
      return 'border: 1px solid lightgray'
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }

}
</script>

<style>
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
  height: 200px;
  padding-top: 5px;
  border-radius: 20px;
  background: white;
  margin-top: 20px;
}
p{
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 20px;

}
.block{
  background: white;
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
  padding: 20px 20px 20px;
  border-bottom: solid 1px #F0EEEE;
}

.zuiwaiceng .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}

.zuiwaiceng .el-dialog__body {
  height: 200px;
  font-size: 14px;
}
</style>