<template>
  <div class="header">
    <div class="welcome">
      <div class="selection">
        <el-button icon="el-icon-s-unfold" class="foldbutton"></el-button>
      </div>

      <div class="welcome-name">
        <el-row :gutter="10">
          <el-col :span="7">
            <el-button style="text-align: center" type="success" @click="changeHtml">大屏展示</el-button>
          </el-col>
          <el-col :span="6">
            <p class="welcome-name-content">欢迎登录：</p>
          </el-col>
          <el-col :span="10">
<!--            <p class="welcome-name-content">欢迎登录：-->
            <p id="userNameText"></p>
<!--            </p>-->
          </el-col>
        </el-row>


      </div>

      <div class="personal-center">
        <p class="personal-center-content">个人中心：
          <el-select v-model="queryCenters" placeholder="请选择">
            <el-option
                v-for="item in optionsCenters"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: "admin"
        }, {
          value: '选项2',
          label: 'user1'
        }, {
          value: '选项3',
          label: 'user2'
        }],
        optionsCenters: [{
          value: '01',
          label: "租户管理员"
        }, {
          value: '02',
          label: '普通管理员'
        }],
        query: '选项1',
        queryCenters: '01'
      }
    },
    mounted() {
      this.setUserNameText();
    },
    methods:{
      changeHtml(){
        this.$router.replace('http://localhost:8082')
        window.open('http://localhost:8082')
      },
      setUserNameText(){
        document.getElementById("userNameText").innerText=sessionStorage.getItem("userName");
      }
    }
  }
</script>

<style scoped>
  .foldbutton{
    border: none;
  }

  .header{
  }

  .welcome{
    display: flex;

  }

  .selection{
    flex: 1;
  }

  .welcome-name{
    flex: 1;
    font-size: 15px;
  }

  .welcome-name-content{
    text-align: center;
  }


  .personal-center{
    flex: 1;
    font-size: 13px;
  }

  .personal-center-content{
    text-align: right;
  }

  .personal-center-content>>>.el-input__inner{
    border: 0;
    width: 120px;
  }
</style>
