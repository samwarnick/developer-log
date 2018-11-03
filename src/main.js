import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import { createProvider } from "./vue-apollo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueMoment from "vue-moment";
import store from "./store";

library.add(faPlus, faTrashAlt, faGithub);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  store,
  render: h => h(App)
}).$mount("#app");
