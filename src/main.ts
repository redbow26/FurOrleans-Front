import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { apolloClient } from "@/vue-apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";

createApp(App)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount("#app");
