import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";

import Auth from "./layouts/Auth";
import Default from "./layouts/Default";
import ErrorPage from "./layouts/Error";

Vue.component("default-layout", Default);
Vue.component("auth-layout", Auth);
Vue.component("error-layout", ErrorPage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
