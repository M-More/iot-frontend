<template>
  <div class="tableTable">
    <div class="image-box">
      <img class="image" src="../assets/journal.png">
      <div class="title-box">
        <p class="title">日志列表</p>
      </div>
      <div class="searchBox">
        <el-input v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
          class="searchClass"
          resize="both"/>
      </div>
    </div>

    <div class="smallTable">
      <el-table
          :data="tableData.filter(data => !search || data.IP.toLowerCase().includes(search.toLowerCase())|| data.port.toLowerCase().includes(search.toLowerCase())|| data.IP.toLowerCase().includes(search.toLowerCase())|| data.action.toLowerCase().includes(search.toLowerCase())|| data.mes.toLowerCase().includes(search.toLowerCase())|| data.level.toLowerCase().includes(search.toLowerCase())|| data.type.toLowerCase().includes(search.toLowerCase()))"
          style="
          background-color: transparent"
          :header-cell-style="headerStyle"
          height="190px"
          fit="true">
        <el-table-column
            label="时间"
            prop="date"
            :formatter="dateFormat"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column
            label="威胁类型"
            prop="type"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column
            show-overflow-tooltip
            label="源IP"
            prop="IP"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column
            label="源端口"
            prop="port"
            align="center"
            width="120px">
        </el-table-column>

        <el-table-column
            label="威胁级别"
            prop="action"
            align="center"
            width="120px">
          <template slot-scope="item">
            <img :src="item.row.path" />
            <span>{{item.row.level}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="动作说明"
            prop="action"
            align="center"
            width="120px">

          <template slot-scope="item">
            <img :src="item.row.iconpath" />
            <span>{{item.row.action}}</span>
          </template>


        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="120px">
          <template slot-scope="scope">
            <el-button
                size="mini"
                :type="colorChange(scope.row.mes)"
                :disabled="scope.row.status ==1?false:true"
                @click="dialogVisible = true">{{scope.row.mes}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        :visible.sync="dialogVisible"
        close-on-click-modal=ture
        width="40%"
        custom-class="dialog">
      <!--大标题-->
      <div class="title1">日志详情</div>
      <!--上方-->
      <div>
        <!--上方二级标题-->
        <el-button class="dialog_close"
                   @click="dialogVisible=false"></el-button>
        <div class="title-second"><img class="img1" src="../assets/信息.png">基本信息</div>
        <!--上方表格-->
        <div>
          <div class="row-top">
            <div class="col-top">
              <div class="row-top-name">源IP</div>
              <div class="row-top-content">172.168.153.11</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">账号</div>
              <div class="row-top-content">admin</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">用户</div>
              <div class="row-top-content">admin</div>
            </div>
          </div>
          <div class="row-top">
            <div class="col-top">
              <div class="row-top-name">绑定MAC</div>
              <div class="row-top-content">172.168.153.11</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">绑定IP</div>
              <div class="row-top-content">172.168.153.11</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">绑定用户</div>
              <div class="row-top-content">172.168.153.11</div>
            </div>
          </div>
          <div class="row-top">
            <div class="col-top">
              <div class="row-top-name">活跃账号</div>
              <div class="row-top-content">是</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">终端IP</div>
              <div class="row-top-content"><div class="block-status"></div>1.3</div>
            </div>
            <div class="col-top">
              <div class="row-top-name">威胁类型</div>
              <div class="row-top-content">*****</div>
            </div>
          </div>
        </div>
      </div>
      <!--下方-->
      <div>
        <!--上方二级标题-->
        <div class="title-second"><img class="img1" src="../assets/流程.png">处理流程</div>
        <!--下方内容-->
        <div>
          <div class="row-bottom">
            <div class="row-bottom-name1">启 动</div>
            <div class="content-bottom">
              <div class="round1"></div>
              <div class="time">8/27 09:56:20</div>
              <div class="operations">用户行为管控</div>
            </div>
          </div>
          <div class="row-bottom">
            <div class="row-bottom-name2">发 现</div>
            <div class="content-bottom">
              <div class="round2"></div>
              <div class="time">8/27 09:57:14</div>
              <div class="operations">账号请求登录</div>
            </div>
          </div>
          <div class="row-bottom">
            <div class="row-bottom-name3">分 析</div>
            <div class="content-bottom">
              <div class="round3"></div>
              <div class="time">8/27 09:58:34</div>
              <div class="operations">启动准入策略</div>
              <div class="expression">详情信息描述详情信息描述详情信息描述详情信息 详情信息描述</div>
              <div class="gap"></div>
              <div class="time">8/27 09:58:58</div>
              <div class="operations">频繁登陆</div>
              <div class="expression">详情信息描述详情信息描述详情信息描述详情信息 详情信息描述</div>
            </div>
          </div>
          <div class="row-bottom">
            <div class="row-bottom-name4">防 护</div>
            <div class="content-bottom">
              <div class="round4"></div>
              <div class="time">8/27 09:59:16</div>
              <div class="operations">自动告警</div>
            </div>
          </div>
          <div class="row-bottom">
            <div class="row-bottom-name5">启 动</div>
            <div class="content-bottom">
              <div class="round5"></div>
              <div class="time">8/27 09:59:48</div>
              <div class="operations">生成事件</div>
              <div class="expression">详情信息描述详情信息描述详情信息描述详情信息 详情信息描述</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        date: '8/27 09:56',
        type: '视频打码',
        IP: '172.168.153.11',
        port: '38150',
        level: 'L0',
        action: '记录',
        path: require('@/assets/greenblock.png'),
        iconpath: require('@/assets/record.png'),
        mes: '未处理',
        status: '-1'
      }, {
        date: '8/27 09:56',
        type: '无码',
        IP: '172.168.153.122',
        port: '6666',
        level: 'L1',
        action: '告警',
        path: require('@/assets/blueblock.png'),
        iconpath: require('@/assets/alarm.png'),
        mes: '已完成',
        status: '1'
      }, {
        date: '8/27 09:56',
        type: '有码',
        IP: '172.168.153.111',
        port: '8900',
        level: 'L2',
        action: '阻断',
        path: require('@/assets/yellowblock.png'),
        iconpath: require('@/assets/blocking-up.png'),
        mes: '处理中',
        status: '0'
      }, {
        date: '8/27 09:56',
        type: '视频打码',
        IP: '172.168.153.123',
        port: '10000',
        level: 'L3',
        action: '阻断',
        path: require('@/assets/orangeblock.png'),
        iconpath: require('@/assets/blocking-up.png'),
        mes: '已完成',
        status: '1'
      }, {
        date: '8/28 19:40',
        type: '视频打码',
        IP: '172.168.153.135',
        port: '4567',
        level: 'L4',
        action: '告警',
        path: require('@/assets/redblock.png'),
        iconpath: require('@/assets/alarm.png'),
        mes: '已完成',
        status: '1'
      },
        {
          date: '8/30 11:30',
          type: '视频打码',
          IP: '172.168.123.135',
          port: '4567',
          level: 'L4',
          action: '告警',
          path: require('@/assets/redblock.png'),
          iconpath: require('@/assets/alarm.png'),
          mes: '未处理',
          status: '-1'
        },
        {
          date: '8/28 19:40',
          type: '视频打码',
          IP: '172.168.153.135',
          port: '38150',
          level: 'L4',
          action: '告警',
          path: require('@/assets/redblock.png'),
          iconpath: require('@/assets/alarm.png'),
          mes: '已完成',
          status: '1'
        },
        {
          date: '8/28 19:40',
          type: '视频打码',
          IP: '172.168.153.135',
          port: '6666',
          level: 'L4',
          action: '告警',
          path: require('@/assets/redblock.png'),
          iconpath: require('@/assets/alarm.png'),
          mes: '处理中',
          status: '0'
        }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done()
          })
          .catch(() => {})
    },
    headerStyle({rowIndex}) {
      if (rowIndex === 0) {
        return 'line-height:10px'
      } else {
        return ''
      }
    },
    dateFormat:function (row,column){
      var date = row[column.property];
      if(date == undefined){return ''}
      return moment(date).format("MM-DD  HH：MM");
    },
    colorChange:function (mes){
      if(mes == '已完成'){
        return 'success'
      }
      else if (mes == '未处理'){
        return 'danger'
      }
      else if (mes == '处理中'){
        return 'warning'
      }
      else {
        return ''
      }
    }
  }
}
</script>

<style>

template{
  background-color: #408ae5;
}

.tableTable{
  background: url("../assets/background.png") no-repeat center center;
  width: 906px;
  height: 279px;
  display: flex;
}

.image-box {
  position: relative;
  top: 10px;
  left: 24px;
  width: 875px;
  height: 53px;
  display: flex;
}

.image {
  width: 40px;
}


.title-box{
  width: 80px;
  height: 53px;
  display: flex;
  justify-content: space-around;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  text-align: justify;
  margin-top: 10px;
  position: relative;
  left: 10px;
}

.title{
  color: white;
  font-size: 20px;
  font-family: "PingFang SC";
  font-weight: normal;
  text-shadow:
      0 0 7px #408ae5;
  justify-content: left;
  /*display: inline;*/
}

/* 表格内背景颜色 */
.el-table th {
  background-color: #123146 !important;
  color: #00fdee;
}
.el-table tr {
  background-color: transparent !important;
  color: white;
}

.el-table td {
  align-items: center !important;
}

.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #123146 !important;
}

.el-table__body tr,
.el-table__body td {
  padding: 0 !important;
  height: 40px !important;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px dashed #095273 !important;
}

.el-table::before {
  height: 0px !important;
}

.searchClass input.el-input__inner{
  width:210px;
  height:23px;
  position: relative;
  top: -69px;
  right: -12px;
  background: #0a182d;
  border: 0px;
}

.searchBox{
  background: url("../assets/search.png") no-repeat;
  size: 300px;
  width:235px;
  position: relative;
  top: 25px;
  right: -500px;
}

.smallTable{
  position: relative;
  top: 70px;
  left: -325px;
  height: 210px;
  width: 150%;
}

/*dialog样式*/

.dialog{
  box-shadow: none !important;
  background-color: rgba(0,0,0,0) !important;
}
.dialog_close{
  margin: -50px;
  padding: 0;
  width: 30px;
  height: 30px;
  background-color: rgba(1,1,1,0) !important;
  box-shadow: none !important;
  border: none !important;
  z-index: 2;
  position: absolute;
  top: 5px;
  right: 5px;
}
.el-dialog__header{
  display: none;
}
.el-dialog__body{
  background: url("../assets/带装饰.png") no-repeat;
  padding-bottom: 10px !important;
  padding-left: 3px !important;
  padding-right: 3px !important;
  margin: 0;
}
.title1{
  color: white;
  font-size: 20px;
  font-family: "Adobe Heiti Std";
  position: relative;
  margin-top: -42px;
  margin-left: 9px;
  margin-bottom: -43px;
  text-shadow:
      0 0 5px #00b0a6,
      0 0 8px #00b0a6;
}

.img1{
  position: relative;
  max-width: 30px;
  max-height: 30px;
}
.title-second{
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 16px;
  height: 30px;
  font-family: "PingFangSC";
  color: rgb(123, 247, 237);
  line-height: 1.5;
  text-shadow: 0px 1px 13px rgba(56, 104, 224, 0.42);
}

.row-top{
  display: flex;
  height: 30px;
  width: auto;
  /*background-color: #333333;*/
  margin-left: 10px;
  margin-right: 24px;
  margin-bottom: 10px;
}

.row-bottom{
  display: flex;
  width: auto;
  /*background-color: rgba(34,188,231,0.10);*/
  margin-left: 10px;
  margin-right: 50px;
  margin-bottom: 10px;
}

.col-top{
  display: flex;
  width: 40%;
  height: 100%;
  align-items: center;
}

.row-top-name{
  width: 37%;
  font-size: 14px;
  font-family: "PingFangSC";
  color: rgb(135, 199, 255);
  line-height: 1.714;
  text-align: left;
}

.row-top-content{
  display: flex;
  align-items: center;
  width: 63%;
  font-size: 14px;
  font-family: "PingFangSC";
  color: rgb(255, 255, 255);
  line-height: 1.2;
  text-align: left;
}
.row-bottom-name1,.row-bottom-name2,.row-bottom-name3,.row-bottom-name4,.row-bottom-name5{
  writing-mode : tb-rl;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 14px;
  font-family: "PingFangSC";
  line-height: 1.714;
  text-align: left;
  border-right: 1px dashed white;
  margin-left: 20px;
}

.row-bottom-name1 {
  color: rgb(200, 219, 247);
  background-color: rgba(175, 196, 214,0.2);
}
.row-bottom-name2{
  color: rgb(169, 130, 255);
  background-color: rgba(161, 119, 255,0.2);
}
.row-bottom-name3{
  color: rgb(255, 212, 40);
  background-color: rgba(156, 81, 0,0.2);
}
.row-bottom-name4{
  color: rgb(193, 84, 255);
  background-color: rgba(193, 0, 158,0.2);
}

.row-bottom-name5{
  color: rgb(0, 255, 66);
  background-color: rgba(0, 255, 66,0.2);
}

.content-bottom{
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 14px;
  font-family: "PingFangSC";
  line-height: 1.2;
  text-align: left;
  padding-left: 40px;
  padding-right: 45px;
  padding-bottom: 5px;
  background-color: rgba(34, 188, 231,0.102);
}

.block-status{
  height: 10px;
  width: 10px;
  background-color: orange;
}
.time,.expression,.expression-final{
  font-size: 14px;
  font-family: "Arial";
  color: rgb(255, 255, 255);
  line-height: 1.143;
}
.time{
  margin-top: -5px;
}
.expression {
  line-height: 1.429;
}
.operations{
  font-size: 14px;
  font-family: "PingFangSC";
  color: rgb(135, 199, 255);
  line-height: 1.714;
}
.round1,.round2,.round3,.round4,.round5{
  border-radius: 50%;
  width: 15px;
  height: 15px;
  position: relative;
  left: -47px;
  top: 40%;
}
.round1{
  background: url("../assets/紫圆.png");
}
.round2{
  background: url("../assets/紫圆.png");
}
.round3{
  top: 45%;
  background: url("../assets/黄圆.png");
}
.round4{
  background: url("../assets/桃圆.png");
}
.round5{
  background: url("../assets/绿圆.png");
}
.gap{
  height: 15px;
}
</style>

