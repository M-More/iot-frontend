<template>
  <div class="supList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="supBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">供应商列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>供应商查询</p>
      <el-col :span="24">
        <div class="supQuire-div">
          <el-form class="supQuire-form">
            <el-row class="supQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: 700" :span="8">供应商名称</el-col>
              <el-col style="font-weight: 700" :span="8">供应商编码</el-col>
            </el-row>
            <el-row class="supQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入供应商名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputState" placeholder="请输入供应商编码,格式为GYS_数字，如GYS_001">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item style="text-align: right;">
                  <el-button class="el-button1" type="warning" @click="supQuery">查询</el-button>
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
          <el-button class="el-button1" type="success" @click="supAdd">新增</el-button>
        </el-col>
        <el-col :span="8" >
          <el-button class="el-button1" type="success" @click="reflash">刷新</el-button>
        </el-col>
      </el-row>
    <!--供应商信息显示栏-->
      <div>
        <el-row>
          <p>供应商信息</p>
        </el-row>

        <el-tabs style="background: white; line-height: 10px;padding-bottom:0px" v-model="activeName" type="card" @tab-click="handleClick">
            <template>
              <el-table
                  class="el-table-list"
                  :data="tableData"
                  :header-cell-style="headerStyle2"
                  :cell-style="cellStyle2"
                  row-style="height:10px"
                  style="width: 100%; font-size: 8px;">
                <el-table-column
                    prop="supplierName"
                    label="供应商名称"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    prop="supplierCode"
                    label="供应商编码"
                    width="100px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="contactName"
                    label="联系人"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="contactTel"
                    label="电话"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    width="150px"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    width="150px"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="supUpdateButt" type="text" @click="supUpdate(scope.$index,scope.row)">修改信息</el-button>
                    <el-button type="text" @click="supDel(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>

        </el-tabs>
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

  </div>
</template>

<script>
export default {
  name: "Supplier",
  data() {
    return {
      supplierName:"",
      supplierCode:"",
      contactTel:"",
      contactName:"",
      address:"",
      note:"",
      createTime:"",
      createUser:"",
      tableData: [],
      search: '',
      disablePage: false,
      total: 0,
      pageSize: 10,
      page:1,

      indexTable: [{
      }],
      tabTable: [{
      }],

      inputTitle: '',
      inputState: '',
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
        url: 'http://localhost:8080/supplier/getAll',
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
    //刷新
    reflash(){
      this.$router.go(0);
    },
    //  查询
    supQuery(){
      let postData = {
        supplierName: this.inputTitle,
        supplierCode: this.inputState,
        page:this.page,
        pageSize:this.pageSize,
      };
      console.log("postData为")
      console.log(postData)
      console.log("postData成功")
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/supplier/getBy',
        params: postData
      }).then(response =>
      {
        //分页器处在非第一页时，依旧能保证查到所有的数据
        if(response.data.data.length==0){
          this.page-=1
          if(this.page==0){
            this.page=1
            this.tableData= response.data.data;
            this.total=response.data.total
          }
          this.supQuery()
        }else{
          this.tableData= response.data.data;
          this.total=response.data.total
        }
        }).catch(error =>
      {
        console.log(error);
      });
    },
    //  修改，跳转到修改页面
    supUpdate(index, row){
      console.log(index,row)
      sessionStorage.setItem('supplierName',row.supplierName);
      sessionStorage.setItem('supplierCode',row.supplierCode);
      sessionStorage.setItem('contactTel',row.contactTel);
      sessionStorage.setItem('contactName',row.contactName);
      sessionStorage.setItem('address',row.address);
      sessionStorage.setItem('note',row.note);
      this.$router.replace({path: '/home/supplierList/supplierUpdate'})
    },
    //  新增，跳转到新增页面
    supAdd(){
      this.$router.replace({path: '/home/supplierList/supplierAdd'})
    },
    //  删除
    supDel(index, row){
      console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {
          supplierCode: row.supplierCode,
        };
        //回传数据
        this.axios({
          method: 'post',
          url:'http://localhost:8080/supplier/delete',
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
    //获取页面数据
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
    // 页面尺寸动态调整
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
    //更改每页最大数量
    handleSizeChange(val) {
      this.page = 1;
      this.pageSize = val;
      this.supQuery(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    //换页
    handleCurrentChange(val) {
      this.page = val;
      this.supQuery(val,this.pageSize)
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
.supBreadcrumb{
  height: 30px;
}
/*头*/
.el-header{
  text-align: left;
  line-height: 53px;
}
/*右侧页面整体样式*/
.supList .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.supList .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}
.supList .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.supList .el-dialog__body {

  height: 30px;
  font-size: 14px;
}
.supList .el-row{
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
.supQuire-row-1{
  text-align: left !important;
  padding-bottom: 8px;
  padding-left: 20px;
  line-height: 50px;
}
.supQuire-row-2{
  padding: 10px;
}


.detailList{
  /*height: 450px;*/
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 20px;
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

.s el-row{
  height: 10px;
}

</style>