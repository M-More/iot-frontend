
<template>
  <el-card class="box-card">
    <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>信息审核</el-breadcrumb-item>
        <el-breadcrumb-item>信息审核</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="boxContext">
        <div class="boxRight">
          <div class="xiangqing">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
              <el-form-item label="供应商名称" prop="name">
                <el-input v-model="form.name" placeholder="1-25个字符"></el-input>
              </el-form-item>
              <el-form-item label="供应商编码" prop="code">
                <el-input v-model="form.code" placeholder="1-25个字符"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="contactNumber">
                <el-input v-model="form.contactNumber" placeholder="1-25个字符"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input v-model="form.contactName" placeholder="1-25个字符"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="备注" class="el-form-item-full">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="form.mainText"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="boxFooter">
        <el-button class="bottoms-style" size="mini" type="success" @click="save('form')">保存</el-button>
        <el-button class="bottoms-style" size="mini" type="warning" @click="upload('form')">提交审核</el-button>
        <el-button class="bottoms-style" size="mini" @click="back">返回</el-button>
      </div>
      <div class="boxSpace"></div>
    </div>
  </el-card>

</template>

<style>
.boxPage{
  height: 100%;
  width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  /*background-color: #262f40;*/
}
.boxContext{
  hight: 85%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.boxHeader{
  height: 5%;
  width: 100%;
  margin: 0;
  padding: 0;

}
.boxLeft{
  height: 100%;
  width: 20%;
  margin: 0;
  padding: 0;
  /*background-color: #00b0a6;*/
}
.boxRight{
  height: 100%;
  width: 80%;
  margin: 0;
  padding: 0;
  /*background-color: #262f40;*/
}
.boxFooter{
  height: 8%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}
.boxSpace{
  width: 100%;
  height: 2%;
}
.boxStyle{
  margin: 5%;
  padding: 0;
  height: 30%;
  width: 90%;
  box-shadow: 0px 0px 2px #000000;
}
.boxImg{
  height: 80%;
  width: 100%;
  margin: 0;
}
.boxStyleLabel{
  margin-bottom: 0px;
  padding: 0;
  height: 20%;
  width: 100%;
  background-color: #7f7f7f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-styleLabel{
  flex: 1;
  text-align: center;
  line-height: 80%;
  font-weight: bold;
  color: rgb(255,255,255);
  z-index: 3;
}

/*右侧详情页*/

.xiangqing  {
  text-align: left;
  line-height: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow:auto;
  margin: 1%;
  height: 97%;
  box-shadow: 0px 0px 2px #000000;
  background-color: #ffffff;
}
.xiangqing .el-form-item {
  width: 47%;
}
.xiangqing .el-form-item-full {
  width: 94%;
}
.xiangqing .el-form-item__label {
  font-weight: bolder;
}
.forms{
  padding-left: 5%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.bottoms-style{
  position: relative;
  bottom: 110%;
  font-weight: bold;
}
</style>

<script>
export default {
  data(){
    return {
      form: {
        name: '',
        code: '',
        contactNumber: '',
        contactName: '',
        address: '',
        mainText: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.fetchSup()
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData={
            name: this.form.name,
            code: this.form.code,
            contactNumber: this.form.contactNumber,
            contactName: this.form.contactName,
            address: this.form.address,
            mainText: this.form.mainText,
            createUser:"ysy"
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url:'http://localhost:8080/supplier/add',
            params:postData
          }).then(response=>
          {
            console.log("成功");
            console.log(response);
          }).catch(error =>
          {
            console.log(error);
          });

          alert('保存成功！');
          // console.log(this.form.alarmName)
          this.$router.replace('/eventConfList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/eventConfList')
    }
    // upload(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('提交成功！');
    //     } else {
    //       console.log('提交失败！');
    //       return false;
    //     }
    //   });
    // },
    // back() {
    //   this.$router.replace('/fengcaitable')
    // }
  }
}

</script>
