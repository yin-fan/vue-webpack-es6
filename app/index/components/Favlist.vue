<template>
    <div class="banner">
        <img src="../../images/banner.jpg" alt="">
    </div>
    <div v-for="n in 10" class="msg">div {{msg}}</div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'hello word!'
            }
        }
    }
</script>

<style>
    div.msg {
        background: url("../../images/bg.png");
        width: 300px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 20px auto;
    }
</style>