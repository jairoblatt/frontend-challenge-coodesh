import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vue-meta";

// Global components
import "./components/UI/index";

// Icons | css
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/css/index.css";
import "@/assets/css/transitions.css";

Vue.config.productionTip = process.env.node_env === "production";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
