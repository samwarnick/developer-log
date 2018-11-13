import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import { createProvider } from "./vue-apollo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueMoment from "vue-moment";

library.add(faPlus, faTrashAlt, faGithub, faBookOpen);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
