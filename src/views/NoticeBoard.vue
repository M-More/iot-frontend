<template xmlns:el-con="http://www.w3.org/1999/html">
  <!--  顶部-->
  <el-card class="box-card">
    <div slot="header" class="abc">
      <div class="new">新增/修改</div>
    </div>
    <!--  表格-->
    <!--    inline="true"-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"  class="ruleForm"  >

      <el-row>
        <el-col :span="8" >
          <el-form-item label="标题1"   prop="name1" >
            <el-input placeholder="1-25个字符" v-model="ruleForm.name1"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" >
          <el-form-item label="发布时间1" prop="date1"  required>
            <el-form-item prop="date1">
              <el-date-picker type="date"  placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="状态" >
            <br>
            <div style="text-align: left">--</div>
          </el-form-item>
        </el-col>

        <el-col :span="4" >
          <el-form-item label="操作">
            <div style="text-align: left">
              <br>
            <el-button type="success" @click="submitForm1('ruleForm')" >保存</el-button>

            </div>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-form-item label="通知1" prop="inform1" class="inform-text">
          <el-input type="textarea" v-model="ruleForm.inform1"></el-input>
        </el-form-item>
      </el-row>


      <el-row>
        <el-col :span="8" >
          <el-form-item label="标题2"   prop="name2"  class="inform-title">
            <el-input placeholder="1-25个字符"  v-model="ruleForm.name2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="发布时间2"  required>

            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>

        <el-col :span="4" >
          <el-form-item label="状态" >
            <br>
            <div style="text-align: left">--</div>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="操作">
            <div style="text-align: left">
              <br>
              <el-button type="success" @click="submitForm2('ruleForm')" >保存</el-button>

            </div>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>
        <el-form-item label="通知2" prop="inform2" class="inform-text">
          <el-input type="textarea" v-model="ruleForm.inform2"></el-input>
        </el-form-item>
      </el-row>


      <el-row>
        <el-col :span="8" >
          <el-form-item label="标题3"   prop="name3"  class="inform-title">
            <el-input placeholder="1-25个字符" v-model="ruleForm.name3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="发布时间3"  required>

            <el-form-item prop="date3">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date3"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="4" >

          <el-form-item label="状态" >
            <br>
            <div style="text-align: left">--</div>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="操作">
            <div style="text-align: left">
              <br>
              <el-button type="success" @click="submitForm3('ruleForm')" >保存</el-button>

            </div>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row>
        <el-form-item label="通知3" prop="inform3" class="inform-text">
          <el-input type="textarea" v-model="ruleForm.inform3"></el-input>
        </el-form-item>
      </el-row>
      <div>
        <el-button @click="resetForm('ruleForm')">清除内容</el-button>
      </div>
    </el-form>

  </el-card>


</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name1: '',
        date1: '',
        inform1: '',
        name2: '',
        date2:'',
        inform2: '',
        name3: '',
        date3: '',
        inform3: ''
      },
      rules: {
        name1: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 0, max: 25, message: '请输入 0 到 25 个字符', trigger: 'blur'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择发布时间', trigger: 'change'}
        ],
        inform1: [
          {required: true, message: '请输入通知内容', trigger: 'blur'},
          {min: 0, max: 200, message: '最多输入 200 个字符', trigger: 'blur'}
        ],
        name2: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 0, max: 25, message: '请输入 0 到 25 个字符', trigger: 'blur'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择发布时间', trigger: 'change'}
        ],
        inform2: [
          {required: true, message: '请输入通知内容', trigger: 'blur'},
          {min: 0, max: 200, message: '最多输入 200 个字符', trigger: 'blur'}
        ],
        name3: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 0, max: 25, message: '请输入 0 到 25 个字符', trigger: 'blur'}
        ],
        date3: [
          {type: 'date', required: true, message: '请选择发布时间', trigger: 'change'}
        ],
        inform3: [
          {required: true, message: '请输入通知内容', trigger: 'blur'},
          {min: 0, max: 200, message: '最多输入 200 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    submitForm1(formName){
      const validateList = [];
      this.$refs[formName].validateField(['name1','date1','inform1'],(submitError) => {
        validateList.push(submitError)
      })
      if(validateList.every((item)=> item === '')){
        alert('submit!');
      }
    },

    submitForm2(formName){
      const validateList = [];
      this.$refs[formName].validateField(['name2','date2','inform2'],(submitError) => {
        validateList.push(submitError)
      })
      if(validateList.every((item)=> item === '')){
        alert('submit!');
      }
    },

    submitForm3(formName){
      const validateList = [];
      this.$refs[formName].validateField(['name3','date3','inform3'],(submitError) => {
        validateList.push(submitError)
      })
      if(validateList.every((item)=> item === '')){
        alert('submit!');
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.box-card .el-card__header {
  padding: 1px 10px;
  background-color: darkgray;
  border-color: #333333;
}

.box-card {
  width: 100%;
  font-size: 13px;
  padding: 0;
}
.el-card {
  width: 100%;
  border: .5px solid black;
}
.box-card .el-form-item{
  width: 50%;
}
.box-card .inform-text{
  width: 100%;
}


.inform-text .el-form-item__label::after{
  color: red;
  content: '(内容最多为 200 个字符)';
}

.new{
  height: 50px;
  line-height: 20px;
  text-align: left;
  text-size: 50px;
}

</style>






