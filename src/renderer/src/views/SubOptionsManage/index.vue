<script setup>
import SubOptionsItemsCard from './components/SubOptionsItemsCard/index.vue'
</script>


<template>
    <div class="container">
        <div class="title ww">侧边栏管理</div>
        <div class="added-items ww">
            <div class="items-title">已添加业务</div>
            <div class="items-cards">
                <SubOptionsItemsCard  v-for="item in 10" class="card"></SubOptionsItemsCard>
            </div>
        </div>
        <div class="packed-items ww">
            <div class="items-title">已收折业务</div>
            <div class="items-cards">
                <SubOptionsItemsCard  v-for="item in 3" class="card"></SubOptionsItemsCard>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
    .ww {
        margin:20px;
        margin-bottom: 0;
    }
    .title {
        font-size: 20px;
        margin-left:40px;
    }
    .added-items,
    .packed-items {
        .items-cards {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // background-color: orange;
            align-content: center;
            margin-left:20px;
            .card:nth-child(n+6) {
                margin-top:10px;
            }
            .card {
                width: 70px;
                height: 70px;
                flex-shrink: 0;
                background-color: #fff;
                // flex-basis: 20%;
                margin-right:10px;
            }
        }
    }
    .items-title {
        margin-bottom:10px;
        margin-left:20px;
        font-size:12px;
        color: #b6b6b6;
    }
}
</style>
