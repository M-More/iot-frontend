<template>
  <div class="equipList">
    <!--显示当前页面的路径，快速返回之前的任意页面。-->
    <el-breadcrumb separator="/" class="equipBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">设备列表</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">信息列表</a></el-breadcrumb-item>
    </el-breadcrumb>

    <!--上方查询部分-->
    <el-row class="el-row2">
      <p>设备查询</p>
      <el-col :span="24">
        <div class="equipQuire-div">
          <el-form class="equipQuire-form">
            <el-row class="equipQuire-row-1">
              <!--查询字段-->
              <el-col style="font-weight: 700" :span="6">设备名称</el-col>
              <el-col style="font-weight: 700 ;margin-left:80px" :span="6" >设备类型</el-col>
              <el-col style="font-weight: 700" :span="6">设备品牌</el-col>
            </el-row>
            <el-row class="equipQuire-row-2">
              <!--查询内容输入-->
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="inputTitle" placeholder="请输入设备名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-select v-model="inputTypeName" placeholder="选择事件类型">
                    <el-option
                        v-for="item in optionsOfDev"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-select v-model="inputBrand" placeholder="选择事件品牌">
                    <el-option
                        v-for="item in optionsOfBrand"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item style="text-align: right;">
                  <el-button  type="warning" @click="equipQuery">查询</el-button>
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
        <p>设备列表
          <el-button  type="success" @click="equipAdd" style="float:right; margin-right: 18px">新增</el-button>
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
                    prop="deviceName"
                    label="设备名称">
                </el-table-column>
                <el-table-column
                    prop="deviceTypeName"
                    label="设备类型"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceBrand"
                    label="设备品牌"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="deviceNumber"
                    label="设备编号"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="installAddress"
                    label="安装位置"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="action"
                    label="操作"
                    align="center"
                    show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button class="equipUpdateButt" type="text" @click="equipUpdate(scope.$index, scope.row)">修改信息</el-button>
                    <el-button type="text" @click="equipDel(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </el-tabs>
      </div>
      <!--分页器-->
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
  name: "Equipment",
  data() {
    return {
      // 列表的初始参数 默认值为'' 提供给prop
      deviceName:'',
      deviceTypeName:'',
      deviceBrand:'',
      deviceNumber:'',
      installAddress:'',
      // 列表的初始参数 默认值为[] 提供给接收函数
      tableData: [],
      optionsOfDev:[],
      optionsOfBrand:[],
      // 分页器的初始参数 提供给mounted()的this.fetchData()
      total: 20,
      // 初始显示10条数据
      pageSize: 10,
      // 初始显示第1页
      page: 1,
      //搜索框默认值
      inputTitle: '',
      inputTypeName: '',
      inputBrand: '',
      //标签页限制表头高度
      activeName: 'first',

    }
  },

  mounted() {
    //表格数据
    this.fetchData(this.page,this.pageSize)
    //mounted()钩子函数初始渲染下拉框里的值
    this.selectBrandName()
    this.fetchDev()
  },

  methods: {
    //读取数据表
    fetchData(page,pageSize){
      //传入参数page pageSize (两个都是必填项且得有值）
      let postData={
        page: page,
        pageSize: pageSize
      };
      //向接口发送get请求
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceInfo/getAll',
        params: postData
      }).then(response =>
      {
        //传入的是AppResponse类 提取传入对应字段
        this.tableData = response.data.data
        this.total = response.data.total
      }).catch(error =>
      {
        //打印错误信息（下同）
        console.log(error);
      });
    },

    fetchDev() {
      //读取设备类型
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceType/getAllName',
      }).then(response => {
        // 通过设置中间列表 遍历完成后统一传入下拉框设备类型optionsOfDev
        let optionsList = [];
        for (let i = 0; i < response.data.length; i++) {
          console.log(Object.values(response.data)[i]);
          let optionx = {
            id: i,
            name: Object.values(response.data)[i],
          };
          optionsList.push(optionx);
        }
        this.optionsOfDev = optionsList;
      }).catch(error => {
        console.log(error);
      });
    },
    selectBrandName(){
      let postData={
        deviceTypeName:this.inputType
      };
      //读取品牌
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/supplier/getAllName',
        params: postData
      }).then(response => {
        // 通过设置中间列表 遍历完成后统一传入下拉框品牌类型optionsOfBrand
        let optionsList = [];
        for(let i=0;i<response.data.length;i++){
          let optionx={
            id:i,
            name:Object.values(response.data)[i],
          };
          optionsList.push(optionx)
        }
        console.log(optionsList)
        //去重
        let optionsList1 = Array.from(new Set(optionsList))
        console.log(optionsList1)
        this.optionsOfBrand = optionsList1;
      }).catch(error => {
        console.log(error);
      });
    },

    reflash(){
      //刷新当前页面
      this.$router.go(0);
    },
    equipQuery() {
      // 条件查询
      let pageNew;
      // 只要上方输入框的值有任意改变的话 都从page=1开始查起
      // total/pageSize时会出现分页器点击选项（不止一页） 大于1的传当前this.page值
      if (this.inputTitle !== sessionStorage.getItem('inputTitle') ||
          this.inputTypeName !== sessionStorage.getItem('inputTypeName') ||
          this.inputBrand !== sessionStorage.getItem('inputBrand') ||
          (sessionStorage.getItem('total')/this.pageSize) <=1
          // eslint-disable-next-line no-empty
      ){
        pageNew = 1
      }else {
        pageNew = this.page
      }
      // 传入参数 page pageSize必填 其他可以为空 模糊查询
      let postData = {
        deviceName: this.inputTitle,
        deviceTypeName: this.inputTypeName,
        deviceBrand: this.inputBrand,
        page: pageNew,
        pageSize: this.pageSize,
      };
      console.log(postData)
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/deviceInfo/getBy',
        params: postData
      }).then(response => {
        this.tableData = response.data.data;
        this.total = response.data.total
        //重点：得把total保存下来 给equipQuery()的pageNew比较使用
        sessionStorage.setItem('total', response.data.total);
        console.log(response.data);
        console.log("查询成功");
      }).catch(error => {
        console.log(error);
      });
    },

    equipUpdate(index, row){
      // 修改，跳转到修改页面
      // 一系列传入参数 详情见接口表
      sessionStorage.setItem('deviceNumber',row.deviceNumber);
      sessionStorage.setItem('deviceSort',row.deviceSort);
      sessionStorage.setItem('deviceBrand',row.deviceBrand);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('deviceModel',row.deviceModel);
      sessionStorage.setItem('installDate',row.installDate);
      sessionStorage.setItem('installAddress',row.installAddress);
      sessionStorage.setItem('deviceStatus',row.deviceStatus);
      sessionStorage.setItem('longitude',row.longitude);
      sessionStorage.setItem('latitude',row.latitude);
      //跳转路径 注意有home
      this.$router.replace({path: '/home/equipmentList/equipmentUpdate'})
    },
    equipAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/home/equipmentList/equipmentAdd'})
    },
    equipDel(index, row){
      //  删除
      console.log(index, row);
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //传入删除id（唯一）
        let postData = {
          deviceNumber: row.deviceNumber,
        };
        this.axios({
          method: 'post',
          url:'http://localhost:8080/deviceInfo/delete',
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
      // 清空上方输入框内容
      this.inputTitle='';
      this.inputTypeName ='';
      this.inputBrand='';
    },
    //列表边框样式
    headerStyle2({rowIndex}) {
      if (rowIndex === 0) {
        return 'border: 1px solid lightgray'
      }
      else
        return ''
    },
    //列表边框样式
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
      this.equipQuery(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //换页
      this.page = val;
      //通过上方输入框的值看是全部读取的换页还是模糊查询的换页
      if(this.inputTitle === '' && this.inputBrand === '' && this.inputTypeName === ''){
        this.fetchData(this.page,this.pageSize)
      }else{
        this.equipQuery(this.page,this.pageSize)
      }
      // 重点：每次分页器跳转得把输入框的值保存下来 给equipQuery()的pageNew比较使用
      sessionStorage.setItem('inputTitle',this.inputTitle);
      sessionStorage.setItem('inputBrand',this.inputBrand);
      sessionStorage.setItem('inputTypeName',this.inputTypeName);
      console.log(`当前页: ${val}`);
    },
  }

}
</script>

<style scoped>
/*面包屑样式：行高*/
.equipBreadcrumb{
  height: 30px;
}
/*头*/
.el-header{
  text-align: left;
  line-height: 53px;
}
/*右侧页面整体样式*/
.equipList .el-dialog__title {
  text-align: left;
  font-size: 20px;
}
.equipList .el-dialog__header {
  height: 10px;
  padding: 20px 20px 30px;
  border-bottom: solid 1px #F0EEEE;
}
.equipList .el-dialog__footer {
  height: 50px;
  border-top: solid 1px #F0EEEE;
}
.equipList .el-dialog__body {
  height: 300px;
  font-size: 14px;
}
.equipList .el-row{
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
.equipQuire-row-1{
  text-align: left !important;
  padding-bottom: 8px;
  padding-left: 20px;
  line-height: 50px;
}
.equipQuire-row-2{
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
  text-align: right;
}

</style>