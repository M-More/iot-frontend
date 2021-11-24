<template>
  <div class="detailed-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>供应商修改</el-breadcrumb-item>
      <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    表单-->
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

</template>

<script>
export default {
  data(){
    return {
      form: {
        name: sessionStorage.getItem('supplierName'),
        code: sessionStorage.getItem('supplierCode'),
        contactNumber: sessionStorage.getItem('contactTel'),
        contactName: sessionStorage.getItem('contactName'),
        address: sessionStorage.getItem('address'),
        mainText: sessionStorage.getItem('note'),
        updateUser:'ysy'
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
    console.log(typeof sessionStorage.getItem('supplierName'))
  },
  methods:{
    save(){
      let postData={
        supplierName: this.form.name,
        supplierCode: this.form.code,
        contactTel: this.form.contactNumber,
        contactName: this.form.contactName,
        address: this.form.address,
        note:this.form.mainText,
        updateUser:"ysy"
      };
      // console.log(postData.supplierName);
      this.axios({
        method: 'post',
        url:'http://localhost:8080/supplier/update',
        params:postData
      }).then(response=>
      {
        console.log(response);
      }).catch(error =>
      {
        console.log(error);
      });

      alert('保存成功！');
      console.log(postData.alarmName);
      this.$router.replace('/supplierList');
    },
    back(){
      this.$router.replace('/supplierList')
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