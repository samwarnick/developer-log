import Vue from "vue";
import Router from "vue-router";
import { isLoggedIn } from "./utils/auth";

Vue.use(Router);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: loadView("Home")
    },
    {
      path: "/login",
      name: "Login",
      component: loadView("Login")
    },
    {
      path: "/log",
      name: "log",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: loadView("LogEntries"),
      async beforeEnter(to, from, next) {
        if (!(await isLoggedIn())) {
          // TODO: Maybe check isAuthenticated and then set values here instead of going to login page
          next("/login");
        } else {
          next();
        }
      }
    },
    { path: "*", component: loadView("NotFound") }
  ]
});
