<template>
  <div class="equipTypeList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="equipBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">设备类型列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>设备类型查询</p>
      <el-col :span="24">
        <div class="equipTypeQuire-div">
          <el-form class="equipTypeQuire-form">
            <el-row class="equipTypeQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: 700" :span="8">设备类型名称</el-col>
              <el-col style="font-weight: 700" :span="8">设备类型编号</el-col>
            </el-row>
            <el-row class="equipTypeQuire-row-2" :gutter="20">
              <!--查询内容输入-->
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入设备类型名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-input v-model="inputCode" placeholder="请输入设备类型编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item style="text-align: right;">
                  <el-button  type="warning" @click="equipTypeQuery">查询</el-button>
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
          <p>设备类型信息
          <el-button  type="success" @click="equipTypeAdd" style="float:right; margin-right: 18px">新增</el-button>
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
                    prop="deviceTypeName"
                    label="设备类型名称"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceTypeCode"
                    label="设备类型编号"
                    show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="equipTypeUpdateButt" type="text" @click="equipTypeUpdate(scope.$index, scope.row)">修改信息</el-button>
                    <el-button type="text" @click="equipTypeDel(scope.$index, scope.row)">删除</el-button>
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
            :page-sizes="[10,20,50]"
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
  name: "EquipmentType",
  data() {
    return {
      // 列表的初始参数 默认值为'' 提供给prop
      deviceTypeName:"",
      deviceTypeCode:"",
      deviceNote:"",
      deviceCreateTime:"",
      deviceUpdateTime:"",
      // 列表的初始参数 默认值为[] 提供给接收函数
      tableData: [],
      // 分页器的初始参数 提供给mounted()的this.fetchData()
      total: 0,
      // 初始显示10条数据
      pageSize: 10,
      // 初始显示第1页数据
      page: 1,

      //搜索框默认值
      inputTitle: '',
      inputCode: '',
      //标签页限制表头高度
      activeName: 'first',

    }
  },
  mounted() {
    //初始加载数据
    this.fetchData(this.page,this.pageSize)
  },
  methods: {
    //读数据表
    fetchData(page,pageSize){
      // page pageSize必填项
      let postData={
        page: page,
        pageSize: pageSize
      };
      console.log(postData);
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceType/getAll',
        params: postData
      }).then(response =>
      {
        //传入表格
        console.log(response.data.data);
        this.tableData = response.data.data;
        this.total=response.data.total;
      }).catch(error =>
      {
        console.log(error);
      });
    },

    reflash(){
      //刷新页面
      this.$router.go(0);
    },

    equipTypeQuery() {
      //  查询
      let pageNew;
      // 只要上方输入框的值有任意改变的话 都从page=1开始查起
      // total/pageSize时会出现分页器点击选项（不止一页） 大于1的传当前this.page值
      if (this.inputTitle !== sessionStorage.getItem('inputTitle') ||
          this.inputCode !== sessionStorage.getItem('inputCode') ||
          (sessionStorage.getItem('total')/this.pageSize) <=1
          // eslint-disable-next-line no-empty
      ){
        pageNew = 1
      }else {
        pageNew = this.page
      }
      //输入框里的值和 page，pageSize
     let postData = {
       deviceTypeName: this.inputTitle,
       deviceTypeCode: this.inputCode,
       page: pageNew,
       pageSize: this.pageSize,
     }
        this.axios({
          method: 'get',
          url: 'http://localhost:8080/deviceType/getPageBy',
          params: postData
        }).then(response => {
          this.tableData = response.data.data;
          this.total = response.data.total
          //重点：得把total保存下来 给equipQuery()的pageNew比较使用
          sessionStorage.setItem('total', response.data.total);
        }).catch(error => {
          console.log(error);
        });

    },
    equipTypeUpdate(index, row){
      //  修改，跳转到修改页面
      // 传入修改表格参数
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('deviceTypeCode',row.deviceTypeCode);
      sessionStorage.setItem('deviceNote',row.deviceNote);

      // 跳转到修改页面
      this.$router.replace({path: '/home/equipmentTypeList/equipmentTypeUpdate'})
    },
    equipTypeAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/home/equipmentTypeList/equipmentTypeAdd'})
    },
    equipTypeDel(index, row){
      //  删除
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let postData = {
          deviceTypeCode: row.deviceTypeCode,
        };
        this.axios({
          method: 'post',
          url:'http://localhost:8080/deviceType/delete',
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
      // 重置输入框的值
      this.inputTitle='';
      this.inputCode='';
    },
    //表格边框样式
    headerStyle2({rowIndex}) {
      if (rowIndex === 0) {
        return 'border: 1px solid lightgray'
      }
      else
        return ''
    },
    //表格边框样式
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
      // this.equipTypeQuery(this.page,this.pageSize)
      this.fetchData(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //换页
      this.page = val;
      if(this.inputTitle === '' && this.inputBrand === '' && this.inputLevel === ''){
        //全空默认全传
        this.fetchData(this.page,this.pageSize)
      }else{
        //模糊查询
        this.equipTypeQuery(this.page,this.pageSize)
      }
      sessionStorage.setItem('inputTitle',this.inputTitle);
      sessionStorage.setItem('inputCode',this.inputCode);
      console.log(`当前页: ${val}`);
    },
  }

}
</script>

<style scoped>

.equipBreadcrumb{
  height: 30px;
}
/*头*/
.el-header{
  text-align: left;
  line-height: 53px;
}
/*右侧页面整体样式*/
.equipTypeList .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.equipTypeList .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}
.equipTypeList .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.equipTypeList .el-dialog__body {
  height: 300px;
  font-size: 14px;
}
.equipTypeList .el-row{
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
.equipTypeQuire-row-1{
  text-align: left !important;
  padding-bottom: 8px;
  padding-left: 20px;
  line-height: 50px;
}
.equipTypeQuire-row-2{
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