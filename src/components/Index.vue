<template>
    <div id="wrap">
        <navigation />
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import Navigation from '@/components/Navigation'
    export default{
        components:{
            Navigation
        },
        name: 'index',
        data() {
            return { 
            }
        },
    }
</script>

<style lang="less" scoped>
    #wrap{
        padding-left:40px;
        box-sizing:border-box;
    }

</style>