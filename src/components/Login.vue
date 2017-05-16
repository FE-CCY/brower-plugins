<template>
<div class="login">
    <img src="../assets/img/logo.png" />
    <form v-on:submit.prevent="submit" class="login-form" key="login">
        <ul>
            <li>
                <label>
                <input name="user" v-model="account" placeholder="手机号 / 邮箱" type="text">
                <i class="iconfont">&#xe60e;</i>
            </label>
            </li>
            <li>
                <label>
                <input name="pwd" v-model="password" placeholder="请输入密码" type="password">
                <i class="iconfont">&#xe68b;</i>
            </label>
            </li>
            <li>
                <button type="submit" class="ui-btn" >登 录</button>
                <p class="error-msg" v-text="errorMsg"></p>
            </li>
        </ul>
        <p class="tc"><a target="_blank" href="http://www.taoooa.com/pwdreset">忘记密码</a> <span class="ml5 mr5"> | </span> <a target="_blank" href="http://www.taoooa.com/register">注册帐号</a></p>
    </form>
</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import api from '../api'
    export default {
        name: 'Login',
        data() {
            return {
                account: '',
                password: '',
                errorMsg: ''
            }
        },
        computed:{
            ...mapGetters({
                isLogin:'isLogin'
            })
        },
        watch:{
            'isLogin':function(val,oldVal){
                if(val){
                    this.$router.replace(this.$route.query.redirect || '/my')
                }
            }
        },
        methods: {
            ...mapActions([
                'init',
                'login'
            ]),
            submit:function(){
                api.user.login({
                    account:this.account,
                    password:this.password
                }).then(({data}) => {
                    this.errorMsg = data.status ? "" : data.msg;
                    if(data.status){
                        this.login();
                        this.init();
                        this.$router.replace(this.$route.query.redirect || '/my')
                    }
                })
            },
            rediret:function(){
                this.$router.replace(this.$route.query.redirect || '/my')
            }
        },
        created () {
        }
    }
</script>

<style scoped lang="less">
.login{
    text-align:center;
    padding-top:40px;
}
.login-form {
    width: 220px;
    margin: 40px auto 0;
    ul{
        margin-bottom: 40px;
    }
    li{
        margin-bottom: 32px;
        text-align: center;
        position: relative;
        input{
            border: 0;
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            width: 100%;
            padding:0 0 4px 50px;
            height: 34px;
            &:focus{
                border-bottom: 1px solid #f8a321;
            }
            &:focus+.iconfont{
                color: #f8a321
            }
        }
        i{
            font-size: 20px;
            position: absolute;
            top: 3px;
            left: 10px;

        }
        .error-msg{
            min-height: 16px;
            margin-top: 10px;
            text-align: center;
            color: #f95618;
        }
    }
   
}

</style>