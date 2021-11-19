<template>
  <div class="zuiwaiceng">
    <el-breadcrumb separator="/" class="toubu">
      <el-breadcrumb-item :to="{ path: '/' }">社区服务</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">社区风采</a></el-breadcrumb-item>
    </el-breadcrumb>


    <el-row class="el-row2">
      <p>风采查询</p>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form class="demo-ruleForm">
            <el-row class="el-row-inner1">
              <el-col style="font-weight: 700" :span="8">
                标题
              </el-col>
              <el-col style="font-weight: 700" :span="8">
                风采状态
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


    <div class="liebiao">
      <div class="con-title2">
        <p class="ptest">风采列表</p>
        <el-button type="success" @click.native="xinzeng" id="xinzeng" size="mini">新增</el-button>
      </div>
      <div>
        <template>
          <el-table

              :data="fengcaiData"
              :header-cell-style="headerStyle2"
              :cell-style="cellStyle2"
              row-style="height:20px"
              style="width: 100%;font-size: 8px; line-height: 20px">
            <el-table-column
                prop="number"
                label="序号"
                width="50px"
            >
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="200px"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="community"
                label="所属社区"
                width="200px"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
                width="200px"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="status"
                label="风采状态"
                width="200px"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="action"
                label="操作"
                width="150px"
                show-overflow-tooltip>

              <template slot-scope="{}">
                <el-dropdown size="medium">
                  <el-button  size="mini" type="success">
                    请选择<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="$router.push('/About')">详情</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteIt">删除</el-dropdown-item>
                    <el-dropdown-item @click.native="xiaxian">下线</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>

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
      indexTable: [{
      }],
      tabTable: [{
      }],
      fengcaiData: [{
        number:1,
        title:'si会起步村民自治工作法介绍',
        community:'赵桥',
        createTime:'2021-07-06 13:23:59',
        status:'审核中',

      },
        {
          number:2,
          title:'五会起步村民自治工作法介绍',
          community:'赵桥',
          createTime:'2021-07-06 13:20:59',
          status:'已发布',
        },
        {
          number:3,
          title:'五会起步村民自治工作法介绍',
          community:'赵桥',
          createTime:'2021-07-06 13:20:59',
          status:'已发布',
        },
        {
          number:4,
          title:'五会起步村民自治工作法介绍',
          community:'赵桥',
          createTime:'2021-07-06 13:20:59',
          status:'已发布',
        }
      ],
      dialogVisible: false,
      search: '',
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
    resetForm() {
      this.inputTitle='';
      this.inputState='';
    },
    searchFile(){
      if (this.isSearch) {
        this.toBeSearched = this.fengcaiData
        this.isSearch = false
      }
      let data1 = this.toBeSearched.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(this.inputTitle)> -1
        })
      })
      this.fengcaiData = data1.filter(data1 => {
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
    },
    handleChange(value) {
      console.log(value);
    },
    deleteIt(index){
      this.$confirm('确认提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.fengcaiData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    xiaxian(){
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '下线成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下线'
        });
      });
    },
    xinzeng() {
      this.$router.replace('/addfengcai');

      let obj = { number:5,
        title:'五会起步村民自治工作法介绍',
        community:'赵桥',
        createTime:'2021-07-06 13:20:59',
        status:'已发布'};
      this.tableData.push(obj);
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
  height: 200px;
  padding-top: 5px;
  border-radius: 20px;
  background: white;
  margin-top: 20px;
}

.el-row2 p{
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 1px solid lightgray;
}

.liebiao p{
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
.con-title2{

}
#xinzeng{
  float: right;
}
.ptest{
  float: left;
}



</style>