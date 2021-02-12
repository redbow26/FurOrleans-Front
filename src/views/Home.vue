<template>
  <div class="home">
    <Article imageUrl="https://zupimages.net/up/21/06/szk1.png"
      title="furorléans" 
      description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500." 
    />
    <Article imageUrl="https://zupimages.net/up/21/06/szk1.png"
      title="furorléans" 
      description="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500." 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Article from "@/components/Article.vue";

export default defineComponent({
  name: "Home",
  components: {
    Article
  }
});
</script>