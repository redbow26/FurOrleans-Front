<template>
    <div class="article">
        <img class="thumbnail" :src="imageUrl" alt="">
        <div class="text">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "article",
    props: {
        title: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        description: {
            type: String,
        },
    }
});
</script>

<style scoped lang="scss" src="../assets/styles/Article.scss" />