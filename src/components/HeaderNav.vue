<template>
    <div class="header_nav">
        <div>
            <p>嗨~欢迎来到重庆商城</p>
            <div class="location">

            </div>
        </div>
        <ul>
            <li><i class="el-icon-user-solid"></i>{{ username }}</li>
            <li><router-link to="/login" class="header-menu"><label @click="loginOut()" class="loginout">退出登录</label></router-link></li>
            <li v-if="this.$route.path.indexOf('/list') === -1"><router-link to="/list">返回首页</router-link></li>
            <li><router-link to="/shopcar" class="header-menu">购物车</router-link></li>
            <li><a>联系客服</a></li>
            <li><a>网站导航</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:this.$store.state.account.username,

        }
    },
    methods: {
        loginOut(){
            try{
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            }
            catch{
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('username');
            }
        }
    }
}
</script>
<style scoped>
.header_nav{
    width: 100%;
    height: 30px;
    background: #F2F2F2;
    font-family:  "Microsoft YaHei";
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.header_nav>div{
    display: flex;
    align-items: center;
}
.header_nav>div p{
	margin: 0 30px 0 20px;
	color: #999;
	font-size: 15px;
}
.header_nav>ul{
	list-style: none;
    display: flex;
    align-items: center;
}
.header_nav>ul>li>a{
    cursor: pointer;
    padding: 5px 15px;
    font-size: 12px;
	line-height: 20px;
    text-decoration: none;
    color: #999;
}
.header_nav>ul>li>a:hover{
	color: red;
}
.loginout{
    cursor: pointer;
}
</style>