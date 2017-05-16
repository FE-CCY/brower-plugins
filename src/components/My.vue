<template>
    <div>
        <div class="user-info">
            <a class="logo" target="_blank" href="http://www.taoooa.com"><img src="../assets/img/logo.png" alt="淘A"></a>
            <a href="javascript:;" class="avatar" ><img :src="user.avatar" alt=""></a>
            <p class="user">{{user.account}}</p>
            <ul class="detail-list">
                <li>
                    <i class="iconfont">&#xe627;</i>
                    <p>我的推广</p>
                    <p><span class="orange">{{user.advCount}}</span> 个</p>
                </li>
                    <li>
                    <i class="iconfont">&#xe6ed;</i>
                    <p>总收入</p>
                    <p><span class="orange">{{user.total}}</span> 元</p>
                </li>
                <li>
                    <i class="iconfont">&#xe618;</i>
                    <p>帐号余额</p>
                    <p><span class="orange">{{user.balance}}</span> 元</p>
                </li>
            </ul>
            <button type="button" class="ui-btn" @click="handleLogout">退出登录</button>
        </div>
    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import api from '@/api'
    export default {
        data(){
            return {}
        },
        computed:{
            ...mapGetters({
                user:'user'
            })
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            handleLogout:function(){
                api.user.logout().then(res => {
                    this.logout();
                    this.$router.replace('/login')
                })

            }
        }
    }
</script>

<style lang="less" scoped>
.user-info{
    margin: 0 auto;
    padding-top:30px;
    text-align: center;
    .logo{
        display: block;
        margin: 0 auto;
        width: 105px;
        height: 36px;
        margin-bottom:30px;
    }
    .avatar{
        margin: 0 auto;
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        overflow: hidden;
        box-sizing: border-box;
        border:4px solid #ededed;
        transition: all 1s;  
        img{
            width: 100%;
            height: 100%;
        }
        &:hover{
            transform: rotate(360deg);  
        }
    }
    .user{
        text-align: center;
        font-size: 16px;
        padding: 10px 0;
        height:20px;
    }
    .ui-btn{
        width: 220px;
    }
    .detail-list{
        text-align: center;
        margin: 20px 0;
        li{
            display: inline-block;
            width: 90px;
            height: 70px;
            i{
                font-size: 30px;
            }
            p{
                padding-top: 3px;
                text-align:center;
            }
        }
    }
}
</style>