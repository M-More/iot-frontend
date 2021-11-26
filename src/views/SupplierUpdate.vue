<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应商修改</el-breadcrumb-item>
      <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    表单-->
    <el-form ref="form" :model="form" :rules="rules" label-position="top" inline=True class="forms">
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="form.supplierName" placeholder="1-25个字符"></el-input>
      </el-form-item>
      <el-form-item label="供应商编码" prop="code">
        <el-input v-model="form.supplierCode" placeholder="不可重复，GYS_数字"
                  onKeyUp="value=value.replace(/[\D]/g,'')">
          <template slot="prepend">GYS_</template>
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactTel">
        <el-input v-model="form.contactTel" placeholder="输入固定电话或手机号"></el-input>
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
      <el-row class="deleteAndDown">
        <el-button size="mini" type="success" @click="save">保存</el-button>
        <el-button size="mini" @click="back">返回</el-button>
      </el-row>

    </el-form>
  </div>

</template>

<script>
export default {
  data(){
    return {
      form: {
        supplierName: sessionStorage.getItem('supplierName'),
        supplierCode: sessionStorage.getItem('supplierCode').slice(4),
        contactTel: sessionStorage.getItem('contactTel'),
        contactName: sessionStorage.getItem('contactName'),
        address: sessionStorage.getItem('address'),
        note: sessionStorage.getItem('note'),
        updateUser:sessionStorage.getItem('userName'),
      },

      rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' },
        ],
        supplierCode: [
          { required: true, message: '请输入供应商编码', trigger: 'blur' }
        ],
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
  mounted() {

    console.log(typeof sessionStorage.getItem('supplierCode'))
  },
  methods:{
    save: function () {
      let postData = {
        supplierName: this.form.supplierName,
        supplierCode:"GYS_"+this.form.supplierCode,
        contactTel: this.form.contactTel,
        contactName: this.form.contactName,
        address: this.form.address,
        note: this.form.note,
        createUser: sessionStorage.getItem('userName'),
      };
      console.log("信息")
      console.log(postData);
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/supplier/update',
        params: postData
      }).then(response =>
      {
        console.log(response);
        console.log("14222222222222222222");
      }).catch(error =>
      {
        console.log(error);
        console.log("1451111111111111111111111111111");
      });
      alert('保存成功！');
      console.log(postData);
      this.$router.replace('/home/supplierList');
    },
    back(){
      this.$router.replace('/home/supplierList')
    }
  }
}
</script>

<style>
.detailed-page  {
  text-align: left;
  line-height: 10px;
}

.forms{
  background-color: white;
  padding-left: 20px;
  margin-top: 20px;
}

.detailed-page .el-form-item {
  margin-bottom: 22px;
  width: 45%;
}

.detailed-page .el-form-item__label {
  font-weight: bolder;
}

.deleteAndDown{
  text-align: center;
}

.detailed-page .el-button{
  margin: 10px;
}



</style>