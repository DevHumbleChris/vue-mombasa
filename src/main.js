import { createApp } from "vue";
import { createPinia } from "pinia";

// Fontawesomeicons.
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { auth } from "@/firebaseConfig";

library.add(fas, fab, far);

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.component("FontAwesomeIcon", FontAwesomeIcon);
    app.use(Vue3Toasity, {
      autoClose: 3000,
    });
    app.use(router);
    app.mount("#app");
  }
});
