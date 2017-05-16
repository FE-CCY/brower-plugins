<template>
    <div class="nav">
        <router-link v-for="(item, index) in data" :to="{path:item.href}" key={index}><i class="iconfont" v-html="item.icon"></i></router-link>
        <a class="update" :title="'当前版本：' + version.current + (version.renewable ? '，最新版本：' + version.newest : '')" target="_blank" href="http://www.taoooa.com/extension">
            <i class="iconfont">&#xe6fe;</i>
            <i v-show="version.renewable" class="update-tip"></i>
        </a>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Navigation',
        props:{
            data:{
                type: Array,
                default:() =>{
                    return [{
                        title:'用户中心',
                        href:'/my',
                        icon:'&#xe60e;'
                    }
                    // ,{
                    //     title:'广告列表',
                    //     href:'/adlist',
                    //     icon:'&#xe627;'
                    // }
                    ];
                }
            }
        },
        data() {
            return {
                versionTip:''
            }
        },
        computed:{
            ...mapGetters({
                version:'version'
            })
        },
        methods:{
            ...mapActions([
                'check'
            ]),
        },
        created:function(){
            this.check();
        }
    }
</script>

<style scoped lang="less" scoped>
    .nav{
        width:40px;
        height:100%;
        background:#f8f8f8;
        position:absolute;
        left:0;
        top:0;
        a{
            display:block;
            width:100%;
            height:40px;
            line-height:40px;
            text-align:center;
            color:#bbb;
            box-sizing:border-box;
            &:hover{
                text-decoration:none;
                color:#ccc;
            }
            &.router-link-active{
                color:#f8a321;
                background:#fff;
            }
            &.update{
                position:absolute;
                bottom:0;
            }
            i{
                font-size:20px;
            }
        }

    }
    .update-tip{
        position:absolute;
        z-index:2;
        display:block;
        top:6px;
        right:10px;
        font-size:0;
        width:4px;
        height:4px;
        border-radius:2px;
        background:#f00;
    }
</style>