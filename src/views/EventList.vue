<template>
  <div class="eventTable">
    <div class="image-box">
      <img class="image" src="../assets/journal.png">
      <div class="title-box">
        <p class="title">事件列表</p>
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
          :data="tableData.filter(data => !search || data.IP.toLowerCase().includes(search.toLowerCase())||data.port.toLowerCase().includes(search.toLowerCase())|| data.action.toLowerCase().includes(search.toLowerCase())|| data.level.toLowerCase().includes(search.toLowerCase())|| data.type.toLowerCase().includes(search.toLowerCase())|| data.date.toLowerCase().includes(search.toLowerCase()))"
          style="
          background-color: transparent"
          :header-cell-style="headerStyle"
          height="190px"
          fit="true">
        <el-table-column
            label="设备信息"
            prop="date"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column
            label="设备类型"
            prop="type"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column

            label="安装时间"
            prop="IP"
            align="center"
            width="120px">
        </el-table-column>
        <el-table-column
            label="安装位置"
            show-overflow-tooltip
            prop="port"
            align="center"
            width="120px">
        </el-table-column>

        <el-table-column
            label="设备负责人"
            prop="action"
            align="center"
            width="120px">
          <template slot-scope="item">

            <span>{{item.row.level}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="设备状态"
            prop="action"
            align="center"
            width="120px">

          <template slot-scope="item">
<!--            <img :src="item.row.iconpath" />-->
            <span>{{item.row.action}}</span>
          </template>


        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="120px">
          <template>
            <el-button
                size="mini"
                type="primary"
                @click="dialogVisible=true">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        custom-class="event-dia"
        title=" "
        :visible.sync="dialogVisible"
        width=345px>
      <!--弹窗内容-->
      <div class="tabClass">
        <div>
          <!--标签页-->
          <el-button class="close-but" @click="dialogVisible=false"></el-button>
          <el-tabs
              class="tab1"
              v-model="activeName"
              type="border-card"
          >
            <el-tab-pane label="事件详情" id="event" name="first">
              <div id="event-content">
                <a class="equipCon">井盖出了一些问题</a><br>
                <a class="equipCon">井盖出了一些问题</a><br>
                <a class="equipCon">井盖出了一些问题</a><br>
                <a class="equipCon">井盖出了一些问题</a>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设备信息" id="equip" name="second">
              <div id="equip-content">
                <a id="head-032">井盖032</a><br>
                <a class="equipCon">设备类型：智能井盖</a><br>
                <a class="equipCon">安装时间：2020-06-22</a><br>
                <a class="equipCon">安装位置：海湾镇XXX路XXX弄</a>
              </div>
            </el-tab-pane>
            <el-tab-pane label="处理流程" id="proce" name="third">
              <div id="proce-content">
                <a class="equipCon">搜集报错信息</a><br>
                <a class="equipCon">派遣人员去进行处理</a><br>
                <a class="equipCon">处理中</a><br>
                <a class="equipCon">提交处理结果</a><br>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "second",
      tableData: [{
        date: '井盖032',
        type: '智能井盖',
        IP: '2020-06-22',
        port: '闵行区海湾镇海沧路太傅弄',
        level: '张三',
        action: '正常',
        path: require('@/assets/greenblock.png'),
        iconpath: require('@/assets/record.png')
      }, {
        date: '井盖033',
        type: '智能井盖',
        IP: '2020-06-23',
        port: '静安区海盗镇风格路凤凰谷弄',
        level: '李四',
        action: '丢失',
        path: require('@/assets/blueblock.png'),
        iconpath: require('@/assets/alarm.png')
      }, {
        date: '井盖035',
        type: '智能井盖',
        IP: '2020-06-24',
        port: '浦东新区阳光镇阿德路而已弄',
        level: '王五',
        action: '正常',
        path: require('@/assets/yellowblock.png'),
        iconpath: require('@/assets/blocking-up.png')
      }, {
        date: '路灯045',
        type: '智能路灯',
        IP: '2021-08-23',
        port: '浦东新区太阳镇环境路考虑弄',
        level: '刘六',
        action: '照明',
        path: require('@/assets/orangeblock.png'),
        iconpath: require('@/assets/blocking-up.png')
      }, {
        date: '路灯056',
        type: '智能路灯',
        IP: '2021-09-12',
        port: '松江区海洋镇天翼路阳路弄',
        level: '李七',
        action: '照明',
        path: require('@/assets/redblock.png'),
        iconpath: require('@/assets/alarm.png')
      },{
      date: '路灯077',
          type: '智能路灯',
          IP: '2021-09-22',
          port: '宝山区海路镇颂歌路规划弄',
          level: '李七',
          action: '照明',
          path: require('@/assets/redblock.png'),
          iconpath: require('@/assets/alarm.png')
    }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    headerStyle({rowIndex}) {
      if (rowIndex === 0) {
        return 'line-height:10px'
      } else {
        return ''
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {done();})
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    }
  }
}
</script>

<style>

template{
  background-color: #408ae5;
}

.eventTable{
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
.eventTable .el-table th {
  background-color: #123146 !important;
  color: #00fdee;
}
.eventTable .el-table tr {
  background-color: transparent;
  color: white;
}

.eventTable .el-table td {
  align-items: center;
}

.eventTable .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #123146 !important;
}

.eventTable  .el-table__body tr,
.eventTable  .el-table__body td {
  padding: 0;
  height: 40px;
}

.eventTable  .el-table td,
.eventTable  .el-table th.is-leaf {
  border-bottom: 1px dashed #095273;
}

.eventTable .el-table::before {
  height: 0;
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

/*---------------------*/

/*弹窗内容样式：标签栏等*/
div.tabClass div{
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
.tab1{
  caret-color: transparent !important;
  width: 100%;
}
/*标签页字体颜色*/
.eventTable .el-tabs__item {
  color: #01f9ee !important;
  font-size: 14px !important;
  border-bottom-color: #389fe3 !important;
}
/*标签页宽高，背景*/
.eventTable .el-tabs__nav {
  min-width: 70px !important;
  display: flex;
}
.eventTable .el-tabs__nav >*
{
  flex: 1;
}
/*标签页选中：字体颜色，边框改变*/
.eventTable .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #f27b02 !important;
  border-left-color: #389fe3 !important;
  border-right-color: #389fe3 !important;
  border-top-color: #389fe3 !important;
  border-bottom: none !important;
}

/*内容页样式*/
.eventTable .el-tabs__content {
  /*height: 441px;*/
  width: 343px;
  color: #ffffff;
  background: transparent;
  text-align: left;
  vertical-align: top;
}
/*内容*/
#event-content{
  line-height: 60px;
}
#equip-content{
  line-height: 60px;
}
#proce-content{
  line-height: 60px;
}
#head-032{
  font-size: 20px;
}
.equipCon{
  font-size: 16px;
}
</style>

<style>
.eventTable .close-but{
  /*height: 30px !important;*/
  width: 10px !important;
  position: absolute;
  top: 20px;
  right: 13px;
  background-color: rgba(100,100,100,0) !important;
  box-shadow: none !important;
  z-index: 2;
  border: none !important;
}

.event-dia{
    background-color : rgba(200,200,100,0) !important;
    box-shadow: none !important;
  }
    /*弹窗样式，去头去尾*/
  .event-dia .el-dialog{
    background: rgba(200,200,100,0) !important;
  }

.event-dia .el-dialog__body  {
  background: url("../assets/event-dia-back1.png") no-repeat;
  height:510px;
  width: 346px;
  overflow-x: hidden;
  overflow-y: auto;
  position:relative;
}

.event-dia .el-dialog__header{
  display: none;
}

/*关闭按钮样式*/
.eventTable .el-dialog__headerbtn i {
  content: '修改下面的font-size可以改变图片的大小';
  font-size: 25px;
  color: #00f8ed !important;
  /*visibility: hidden;*/
}
</style>

