<template>
  <div class="boxPage">
      <el-breadcrumb separator="/" class="boxHeader">
        <el-breadcrumb-item>信息审核</el-breadcrumb-item>
        <el-breadcrumb-item>信息审核</el-breadcrumb-item>
      </el-breadcrumb>
    <div class="boxContext">
      <div class="boxLeft">
        <div class="boxStyle">
          <div class="boxImg">
            <img src="../assets/style_1.png" height="100%" width="100%">
          </div>
          <div class="boxStyleLabel" @click="choseStlye" id="styel_1">
            <div>
              <p class="text-styleLabel">模板1</p>
            </div>

          </div>
        </div>
        <div class="boxStyle">
          <div class="boxImg">
            <img src="../assets/style_2.png" height="100%" width="100%">
          </div>
          <div class="boxStyleLabel"  @click="choseStlye" id="styel_2">
            <p class="text-styleLabel">模板2</p>
          </div>
        </div>
        <div class="boxStyle">
          <div class="boxImg">
            <img src="../assets/style_3.png" height="100%" width="100%">
          </div>
          <div class="boxStyleLabel" @click="choseStlye" id="styel_3">
            <p class="text-styleLabel">模板3</p>
          </div>
        </div>
      </div>
      <div class="boxRight">
        <div class="xiangqing">
          <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
            <el-form-item label="标题" prop="name">
              <el-input
                  v-model="form.name"
                  placeholder="1-25个字符">
              </el-input>
            </el-form-item>
            <el-form-item label="发布来源" prop="origin">
              <el-input
                  v-model="form.origin"
                  placeholder="1-25个字符">
              </el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input
                  v-model="form.author"
                  placeholder="1-25个字符">
              </el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="releaseDate">
              <el-date-picker
                  v-model="form.releaseDate"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="所属组织（不填默认为当前组织）">
              <el-input v-model="form.company"
              ></el-input>
            </el-form-item>
            <br>
            <el-form-item label="封面（图片大小不能超过3M，建议上传200*200尺寸）" required>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <br>
            <el-form-item label="图文内容(建议使用字号28px,字体微软雅黑进行编辑）" class="el-form-item-full">
              <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="form.mainText">
              </el-input>
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
        origin: '',
        author: '',
        releaseDate: '',
        company: '',
        imageUrl: '',
        mainText: '',
        styleChose:''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        origin: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        releaseDate: [
          { required: true, message: '请选择发布日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    choseStlye() {
      let labelList = document.getElementsByClassName("boxStyleLabel");
      for (let i = 0; i < labelList.length; i++) {
        labelList[i].style.backgroundColor = "#7f7f7f" ;
      }
      document.elementFromPoint(event.clientX,event.clientY).style.backgroundColor= "#3e78cc";
      this.form.styleChose = document.elementFromPoint(event.clientX,event.clientY).id;
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isJPG && isLt3M;
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.form.styleChose.length != 0) {
            this.queryParams=formName;
            alert('保存成功！');
          }else {
            alert('请选择一种模板！');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    upload(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.form.styleChose.length != 0) {
            this.queryParams=formName;
            sessionStorage.setItem('queryParam',JSON.stringify(this.queryParams))
            alert('提交成功！');
          }else {
            alert('请选择一种模板！');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/fengcaitable')
    }
  }
}

</script>
