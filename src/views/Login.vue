<template>
<div class="login-info">
  <template v-if="form.loginfo">
    <el-form ref="form" :model="form" label-width="80px">   
      <el-form-item>       
        <label class="title">重庆网上购物商城</label>
      </el-form-item>  
      <el-form-item label="用户名" placeholder="请输入用户名">       
        <el-input v-model="form.username"><i class="el-icon-user-solid" slot="prepend"></i></el-input>
      </el-form-item>
      <el-form-item label="密码" placeholder="请输入密码">
        <el-input v-model="form.password"><i class="el-icon-lock" slot="prepend"></i></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click="onSubmit()" style="width:100%" class="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="success" :underline="false" class="register" @click="onRegister()">忘记密码,点击注册</el-link>
      </el-form-item>
    </el-form>
  </template>
  <template v-if="form.register">
    <el-form ref="form" :model="form" label-width="80px">    
      <el-form-item>       
        <label class="title">重庆网上购物商城</label>
      </el-form-item> 
      <el-form-item label="用户名" placeholder="请输入用户名">       
        <el-input v-model="form.username"><i class="el-icon-user-solid" slot="prepend"></i></el-input>
      </el-form-item>
      <el-form-item label="密码" placeholder="请输入密码">
        <el-input v-model="form.password"><i class="el-icon-lock" slot="prepend"></i></el-input>
      </el-form-item>
      <el-form-item label="确认密码" placeholder="请输入确认密码">
        <el-input v-model="form.confirmPassword"><i class="el-icon-lock" slot="prepend"></i></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click="onSubmit" style="width:100%" class="login">注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="success" :underline="false" class="register" @click="onSwitchLogin()">已有账号,点击登录</el-link>
      </el-form-item>
    </el-form>
  </template>
</div>
</template>
<script>
  import util from '../utils';
  export default {
    data() {
      return {
        form: {
          loginfo:true,
          register:false,
          username: '',
          password: '',
          confirmPassword: ''       
        }
      }
    },
    methods: {
      onSubmit(){
        if(!util.trim(this.form.username) || !util.trim(this.form.password)){
          window.alert('账号或密码不能为空');
          return;
        }else{
          let account={
            username:this.form.username,
            password:this.form.password
          };
          this.$store.dispatch('loginInfo',account).then((Response)=>{ 
            let user=Response.data.data.data;
            this.$store.commit('loginUser',{user});        
            this.$router.push({ path : '/list'});            
          }).catch((error)=>{
            console.log(error.response);
          })
          //window.localStorage.setItem('username',this.username);
          //window.localStorage.setItem('password',this.password);
        }
      },
      onRegister(){
        this.form.loginfo=false;
        this.form.register=true;
      },
      onSwitchLogin(){
        this.form.loginfo=true;
        this.form.register=false;
      }
    }
  }
</script>
<style scoped>
    .login-info{
      height:100%;
      width:400px;
      margin: auto;
      margin-top: 300px;
      padding: 50px; 
      background-color:azure;       
    }
    .title{
      font-size: x-large;
    }
    .register{
      float:right;
      margin-right: 30px;
    }
    .login:hover{
        color: white;
    }
    .login{
      background-color:mediumturquoise;
    }
</style>