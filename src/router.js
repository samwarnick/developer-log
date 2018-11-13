import Vue from "vue";
import Router from "vue-router";
import { isAuthenticated, ensureUserDataSet } from "./utils/auth";

Vue.use(Router);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

const router = new Router({
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
        if (!isAuthenticated()) {
          next("/login");
        } else {
          next();
        }
      }
    },
    { path: "*", component: loadView("NotFound") }
  ]
});

router.beforeResolve((to, from, next) => {
  if (isAuthenticated()) {
    ensureUserDataSet();
  }
  next();
});

export default router;
