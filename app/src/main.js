import { createApp } from "vue";
import App from "./../App.vue";
const app = createApp(App);

//Style SCSS
import "@/assets/scss/font.scss";
import "@/assets/scss/icon.scss";
import "@/assets/scss/app.scss";
import "@/assets/scss/button.scss";
//Khai báo router
import router from "@/routers/router";
app.use(router);

app.mount("#app");
