<template>
  <div class="description">
    <h1 class="name">{{ name }}</h1>
    <p class="">{{ description }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Description",
  props: {
    description: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "FurOrléans"
    }
  }
});
</script>

<style scoped lang="scss" />
