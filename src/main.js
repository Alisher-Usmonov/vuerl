import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router/index";
import Notification from "@kyvg/vue3-notification";

const app = createApp(App);

app.use(router);
app.use(Notification);
app.mount("#app");
