<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import '@/assets/css/reset.css'
import { mapGetters, mapActions } from 'vuex'
export default {
        name: 'app',
        components:{
        },
        data() {
            return { 
            }
        },
        watch:{
            isLogin:function(val,oldVal){
                if(val){
                   // console.log(this.$router)
                }   
            }
        },
        computed:{
            ...mapGetters({
                isLogin:'isLogin'
            })
        },
        methods: {
            ...mapActions([
                'init'
            ])
        },
        created () {
            this.init()
        }
}
</script>

<style lang="less">
    @orange:#f8a321;
    html{
        background:#f1f1f1;
    }
    html,body{
        font-family: PingFang SC,Source Sans Pro,Hiragino Sans GB,Helvetica Neue,Helvetica,Microsoft Yahei,arial,sans-serif;
        font-size: 12px;
        line-height: 1.25;
        color: #555;
    }

    @font-face {
    font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/font/iconfont.woff') format('woff'),
    url('./assets/font/iconfont.ttf') format('truetype'),
    url('./assets/font/iconfont.svg#iconfont') format('svg');
    }
    .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
    .orange{
        color: @orange;
    }
    .ml5{
        margin-left:5px;
    }
    .mr5{
        margin-right:5px;
    }
    input{
        color: #555;
        font-size: 14px;
    }
    a{
        color: #555;
        &:hover{
            color: @orange;
        }
    }
    .ui-btn{
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        height: 38px;
        width: 100%;
        background: @orange;
        color: #fff;
        border: 0;
        border-radius: 19px;
        &:hover{
            opacity: .9;
        }
        &:active{
            opacity: .7;
        }
    }

    #app {
        background:#fff;
        position:relative;
        width:320px;
        height:400px;
        overflow:hidden;
        margin:0 auto;
        box-sizing:border-box;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
</style>
