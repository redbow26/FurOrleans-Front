<template>
  <div class="home">
    <Description description="Little description"></Description>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Description from "@/components/Description.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Description
  }
});
</script>
