<template>
  <div class="loginPage">
  <div class="login" >
    <div class="loginBox">
      <div class="loginText">登录</div>
      <div class="loginAccount">账号:</div>
      <el-input v-model="input" placeholder="请输入userName" id="userName"></el-input>
      <div class="loginPassword">密码：</div>
      <el-input v-model="inputTest" placeholder="请输入password" id="password"></el-input>
      <div id="cannotLogin" style="display: none"> </div>
      <el-button @click.native="login()" id="loginButton" >立即登录 </el-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input:'',
      inputTest:'',
    }
  },
  methods: {
    login(){
      let postUser={
        userAccount:document.getElementById('userName').value,
        userPassword:document.getElementById('password').value
      };

      this.axios({
        method: 'get',
        url: 'http://localhost:8080/user/check',
        params: postUser
      }).then(response =>
      {
        // console.log(response.data.code);
        if (response.data.code==400){
          document.getElementById("cannotLogin").style.display='';
          document.getElementById("cannotLogin").innerHTML='密码错误';
        }
        if(response.data.code==401){
          document.getElementById("cannotLogin").style.display='none';
          sessionStorage.setItem('userAccount',document.getElementById('userName').value);
          sessionStorage.setItem('userPassword',document.getElementById('password').value);
          this.$router.replace('/home')

        }
        if(response.data.code==402){
          document.getElementById("cannotLogin").style.display='';
          document.getElementById("cannotLogin").innerHTML='用户不存在';
        }

      }).catch(error =>
      {
        console.log(error);
      });
    }

  },

}
</script>

<style >
.loginPage{
  position: absolute;
}
.login{
  background: url("../assets/bg_loginPage.png");
  height: 1080px;
  width: 1920px;

}
.loginBox{
  background: url("../assets/bg_loginBox.png");
  height: 659px;
  width: 670px;
  position: absolute;
  top:200px;
  left: 1200px;

}
.loginBox .el-input__inner{
  width: 400px;
  background-color: transparent;
}
.loginText{
  font-size: 30px;
  color: #00f8ed;
  position: absolute;
  left:80px;
  top:30px
}
.loginAccount{
  font-size: 25px;
  color: #00f8ed;
  position: absolute;
  top:115px;
  left: 82px;
}
.loginPassword{
  font-size: 25px;
  color: #00f8ed;
  position: absolute;
  top:270px;
  left: 82px;
}
#userName{
  position: absolute;
  top:150px;
  left: 100px;
}
#password{
  position: absolute;
  top:290px;
  left: 100px;
}

.loginBox .el-button{
  background-color: #00f8ed;
  height: 60px;
  width: 500px;
  position: absolute;
  left: 85px;
  top: 500px;
}
#cannotLogin{
  color: red;
  position: absolute;
  top: 385px;
  left: 292px;
}
</style>