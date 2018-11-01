import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound.vue";
import { isLoggedIn } from "./utils/auth";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/log",
      name: "log",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "log" */ "./views/LogEntries.vue"),
      beforeEnter(to, from, next) {
        if (!isLoggedIn()) {
          next("/login");
        } else {
          next();
        }
      }
    },
    { path: "*", component: NotFound }
  ]
});
