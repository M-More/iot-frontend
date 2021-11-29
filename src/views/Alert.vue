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
              <el-col style="font-weight: 700;" :span="6">*告警级别</el-col>
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
                  <el-input v-model="inputCode" placeholder="请输入告警编码"
                            onKeyUp="value=value.replace(/[\D]/g,'')">
<!--                    <template slot="prepend">GJ_</template>-->
                  </el-input>
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
                    label="设备类型"
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
      // 列表的初始参数 默认值为'' 提供给prop
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
      // 列表的初始参数 默认值为[] 提供给接收函数
      tableData: [],
      // 分页器的初始参数 提供给mounted()的this.fetchData()
      total: 0,
      pageSize: 10,
      page: 1,  //当前页

      //搜索框默认值
      inputTitle: '',
      inputCode: '',
      inputLevel: '',
      //标签页限制表头高度
      activeName: 'first',

    }
  },
  mounted() {
    //mounted()钩子函数初始渲染下拉框里的值
    this.fetchData(this.page,this.pageSize)
  },

  methods: {
    //读数据表
    //传入参数page pageSize (两个都是必填项且得有值）
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
        console.log(response.data.data[0])
        let optionsList = [];
        for (let i = 0; i < response.data.data.length; i++) {
          let items={
            //传入的是AppResponse类 提取传入对应字段
            alarmCode: response.data.data[i].alarmCode,
            alarmLevel:response.data.data[i].alarmLevel,
            alarmName:response.data.data[i].alarmName,
            alarmStatus:response.data.data[i].alarmStatus,
            deviceTypeName:response.data.data[i].deviceTypeName,
            ruleDescription:response.data.data[i].ruleDescription,
            createUser: response.data.data[i].createUser,
            createTime: response.data.data[i].createTime.slice(0,19).replace('T',' '),
            updateTime: response.data.data[i].updateTime.slice(0,19).replace('T',' '),
            updateUser: response.data.data[i].updateUser,
          }
          optionsList.push(items);
        }
        this.tableData = optionsList
        this.total = response.data.total;
      }).catch(error =>
      {
        //打印错误信息（下同）
        console.log(error);
      });
    },

    reflash(){
      //刷新页面
      this.$router.go(0);
    },

    alertQuery(){
      // 条件查询
      let pageNew;
      // 只要上方输入框的值有任意改变的话 都从page=1开始查起
      // total/pageSize时会出现分页器点击选项（不止一页） 大于1的传当前this.page值
      if (this.inputTitle !== sessionStorage.getItem('inputTitle') ||
          this.inputCode !== sessionStorage.getItem('inputCode') ||
          this.inputLevel !== sessionStorage.getItem('inputLevel') ||
          (sessionStorage.getItem('total')/this.pageSize) <=1
          // eslint-disable-next-line no-empty
      ){
        pageNew = 1
      }else {
        pageNew = this.page
      }
      let postData = {
        alarmName:this.inputTitle,
        alarmCode: "GJ_"+ this.inputCode,
        alarmLevel: this.inputLevel,
        page: pageNew,
        pageSize:this.pageSize,
      };
      console.log(postData)
      // alarmName alarmCode alarmLevel为空 调用fetchData全查
      if(postData.alarmName === '' && postData.alarmCode === 'GJ_' && postData.alarmLevel === ''){
        this.fetchData(this.page,this.pageSize)
      }else {
        this.axios({
          method: 'get',
          url: 'http://localhost:8080/alarm/getByCondition',
          params: postData
        }).then(response => {
          this.tableData = response.data.data;
          this.total = response.data.total
          //重点：得把total保存下来 给alertQuery()的pageNew比较使用
          sessionStorage.setItem('total', response.data.total);
          console.log(response.data);
          console.log("查询成功");
        }).catch(error => {
          console.log(error);
        });
      }
    },

    alertUpdate(index, row){
      // 修改，跳转到修改页面
      // 一系列传入参数 详情见接口表
      // 传入修改表格参数
      sessionStorage.setItem('alarmName',row.alarmName);
      sessionStorage.setItem('alarmCode',row.alarmCode);
      sessionStorage.setItem('alarmLevel',row.alarmLevel);
      sessionStorage.setItem('deviceTypeName',row.deviceTypeName);
      sessionStorage.setItem('alarmStatus',row.alarmStatus);
      sessionStorage.setItem('ruleDescription',row.ruleDescription);

      // 跳转到修改页面
      this.$router.replace({path: '/home/alertList/alertUpdate'})
    },

    AlertAdd(){
      //  新增，跳转到新增页面
      this.$router.replace({path: '/home/alertList/alertAdd'})
    },

    alertDel(index, row){
      //  删除
      this.$confirm('删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //传入删除id（唯一）
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
      // 清空上方输入框内容
      this.inputTitle='';
      this.inputCode='';
      this.inputLevel='';
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
      // 新接口
      this.alertQuery(this.page,this.pageSize)
      // this.fetchData(this.page,this.pageSize)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //换页
      this.page = val;
      //通过上方输入框的值看是全部读取的换页还是模糊查询的换页
      if(this.inputTitle === '' && this.inputBrand === '' && this.inputLevel === ''){
        this.fetchData(this.page,this.pageSize)
      }else{
        this.alertQuery(this.page,this.pageSize)
      }
      // 重点：每次分页器跳转得把输入框的值保存下来 给alertQuery()的pageNew比较使用
      sessionStorage.setItem('inputTitle',this.inputTitle);
      sessionStorage.setItem('inputCode',this.inputCode);
      sessionStorage.setItem('inputLevel',this.inputLevel);
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
  height: 40px;
  padding-top: 30px;
  padding-right: 10px;
  /*padding-bottom: 10px;*/
  text-align: right;
}

</style>