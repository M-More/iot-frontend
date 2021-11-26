
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
              <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="form.supplierName" placeholder="1-25个字符"></el-input>
              </el-form-item>
              <el-form-item label="供应商编码" prop="supplierCode">
                <el-input v-model="form.supplierCode" placeholder="编码格式为：GYS_数字,请直接输入后面的数字"
                          onKeyUp="value=value.replace(/[\D]/g,'')">
                  <template slot="prepend">GYS_</template>
                </el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="contactTel">
                <el-input v-model="form.contactTel" placeholder="请输入手机号码"
                ></el-input>
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
                    v-model="form.note"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="boxFooter">
        <el-button class="bottoms-style" size="mini" type="success" @click="save('form')">保存</el-button>
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
    // var isMobileNumber= (rule, value, callback) => {
    //   if (!value) {
    //     return new Error("请输入电话号码");
    //   } else {
    //     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    //     const isPhone = reg.test(value);
    //     value = Number(value); //转换为数字
    //     if (typeof value === "number" && !isNaN(value)) {//判断是否为数字
    //       value = value.toString(); //转换成字符串
    //       if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
    //         callback(new Error("手机号码格式如:138xxxx8754"));
    //       } else {
    //         callback();
    //       }
    //     } else {
    //       callback(new Error("请输入电话号码"));
    //     }
    //   }
    // };
      return {
      form: {
        supplierName: '',
        supplierCode: '',
        contactTel: '',
        contactName: '',
        address: '',
        note: '',
      },
      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        supplierCode: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' }
        ],
        // contactTel: [
        //   { required: true, message: "请输入手机号码", trigger: "blur" },
        //   { validator: isMobileNumber, trigger: "blur" },
        // ],
        contactTel:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator:function(rule,value,callback){
              let regPone = null
              let mobile = /^(1[3456789]\d{9})$/  //手机号
              let tel = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/ // 座机
              if (value !== null && value.charAt(0) === '0') { // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
                regPone = tel
              } else if (value !== null && value.charAt(0) !== '0') {
                regPone = mobile
              }
              if (regPone === null) {
                return callback(
                    new Error('请输入电话')
                )
              } else if (!regPone.test(value)) {
                return callback(
                    new Error("请输入正确的电话格式,其中座机格式'区号-座机号码'")
                )
              } else {
                callback()
              }
              // if (!value) {
              //   callback();
              // } else {
              //   const reg = /^(\d{3,4}-)?\d{7,8}$/;
              //   const isTel = reg.test(value);
              //   if (value.length < 10 || value.length > 13 || !isTel ) {//判断传真字符范围是在10到13
              //     callback(new Error("座机或传真格式如:0376-12345678"));
              //   } else {
              //     callback();
              //   }
              // }

              // if(/^1[34578]\d{9}$/.test(value) == false ){
              //   callback(new Error("请输入正确的手机号"));
              // }else{
              //   callback();
              // }

            },
            trigger: 'blur'
          },
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ]
      }
    }
  },
  // mounted() {
  //   this.fetchSup()
  // },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postData={
            supplierName: this.form.supplierName,
            supplierCode: "GYS_" +this.form.supplierCode,
            contactTel: this.form.contactTel,
            contactName: this.form.contactName,
            address: this.form.address,
            note: this.form.note,
            createUser:sessionStorage.getItem('userName'),
          };
          console.log(postData)
          this.axios({
            method: 'post',
            url:'http://localhost:8080/supplier/add',
            params: postData
          }).then(response => {
            console.log(response);
            if (response.data.code === 0) {
              alert('保存成功！');
            }
            if (response.data.code === 9) {
              alert('添加失败（编号重复）');
            }

          }).catch(error => {
            console.log(error);
          });

          this.$router.replace('/home/supplierList');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.replace('/home/supplierList')
    },




  }
}

</script>
