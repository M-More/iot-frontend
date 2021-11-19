<template>
  <div class="shenhe">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审核</el-breadcrumb-item>
      <el-breadcrumb-item>审核详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-position="top" inline=True class="forms">
      <el-form-item label="序号">
        <el-input
            v-model="form.index"
            :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.name"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属单位">
        <el-input v-model="form.company"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.time"
                  :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="风采状态">
        <el-input v-model="form.status"
                  :disabled="true"
        ></el-input>
      </el-form-item>



      <el-row class="deleteAndDown">
        <el-button type="success" @click="del()">审核通过</el-button>
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
        index: '1',
        name: '23',
        company: '赵桥美丽乡村',
        time: '2021-09-23 01:29:25',
        status: '审核中'
      },
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
.shenhe  {
  text-align: left;
  line-height: 10px;
}
.shenhe .el-form-item {
  margin-bottom: 22px;
  width: 45%;
}
.shenhe .el-form-item__label {
  font-weight: bolder;
}

.forms{
  background-color: white;
  padding-left: 20px;
  margin-top: 20px;
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
.deleteAndDown .el-button{
  margin: 10px;
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