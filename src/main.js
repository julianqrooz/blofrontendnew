import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/counter";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
const authStore = useAuthStore();
authStore.restoreUser();
app.mount("#app");
