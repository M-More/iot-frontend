<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>社区风采</el-breadcrumb-item>
      <el-breadcrumb-item>社区风采详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-position="top" inline=True class="forms">
      <el-form-item label="标题">
        <el-input
            v-model="form.name"
            :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布来源">
        <el-input v-model="form.origin"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="form.time"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属单位">
        <el-input v-model="form.company"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="通知状态">
        <el-input v-model="form.status"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-image
            style="width: 100px; height: 100px"
            :src="url"
        ></el-image>
      </el-form-item>
      <el-form-item label="机审结果">
        <div class="verification">
          <div>机审时间：{{time}}</div>
          <div>机审结果：{{content}}</div>
          <div></div>
        </div>
      </el-form-item>
      <el-form-item label="图文内容(建议使用字号28px,字体微软雅黑进行编辑）">
        <el-input v-model="form.inputbox"
                  placeholder="描述"
        ></el-input>
      </el-form-item>
      <el-row class="deleteAndDown">
        <el-button type="success" @click="del()">发布</el-button>
        <el-dialog
            title="提示"
            :visible.sync="delVisible"
            width="500px"
            custom-class="deleteDia"
        >
          <div class="delContent">确认提交吗？</div>
          <span slot="footer" class="del-dialog-footer">
            <el-button @click="delVisible=false">取 消</el-button>
            <el-button type="primary" @click="delVisible=false">确 定</el-button>
          </span>
        </el-dialog>

        <el-button type="warning"  @click="dialogVisible=true">驳回</el-button>
        <el-dialog
            title="审核驳回"
            :visible.sync="dialogVisible"
            width="500px"
            custom-class="rejectDia"
        >
          <div class="rejectDiaContent">
            <div class="content-title">
              <a class="star">* </a>
              <a class="rejectReason">驳回理由</a>
            </div>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入驳回理由"
                v-model="textarea">
            </el-input>
          </div>
          <span slot="footer" class="rej-dialog-footer">
            <el-button type="success" @click="cancel">保存</el-button>
            <el-button @click="cancel">关 闭</el-button>
      </span>
        </el-dialog>
        <el-button>返回</el-button>
      </el-row>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "del",
  props: {
    delVisible: Boolean,
    data: [],
  },
  data() {
    return {
      form: {
        name: '24',
        origin: '23',
        author: '',
        time: '2021-09-14',
        company: '赵桥美丽乡村',
        status: '审核中',
        inputbox: ''
      },
      url: '../asserts/alarm.png',
      time: '2021-09-23 01:29:25',
      content: '无非法内容',
      dialogVisible: false,
      textarea: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    cancel(){
      this.dialogVisible= false
    },
    del(){
      this.delVisible = true;
    }
  }
}
</script>
<style>
.detailed-page  {
  text-align: left;
  line-height: 10px;
}
.detailed-page .el-form-item {
  margin-bottom: 22px;
  width: 45%;
}
.detailed-page .el-form-item__label {
  font-weight: bolder;
}

.forms{
  background-color: white;
  padding-left: 20px;
  margin-top: 20px;
}

.verification{
  display: flex;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  color: rgba(0,0,0,0.5);
}

.deleteAndDown{
  text-align: center;
}
.deleteAndDown .el-dialog__header{
  text-align: left;
  font-size: 20px;
  line-height: 10px !important;
}
.deleteAndDown .el-dialog__body{
  line-height: 10px !important;
}
.deleteAndDown .el-dialog__footer{
  line-height: 10px !important;
}

.deleteDia .delContent{
  text-align: left;
}


/*边框*/
.rejectDia .el-dialog__header{
  border-bottom: lightgray solid 1px;
  text-align: left;
  font-weight: bold;
}
.rejectDia .el-dialog__headerbtn i {
  /*visibility: hidden;*/
  display: none;
}
.rejectDia .el-dialog__footer{
  border-top: lightgray solid 1px;
}
/*驳回理由*/
.content-title{
  text-align: left;
  padding-bottom: 17px;
  font-weight: bold;
}
.star{
  color: red!important;
}
</style>