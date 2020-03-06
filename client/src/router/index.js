import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login";

import NotFound from "@/views/errors/404";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: Login
  },
  {
    path: "/clients",
    name: "clients",
    component: () => import("../views/Clients")
  },
  {
    path: "/tags",
    name: "tags",
    component: () => import("../views/Tags")
  },
  {
    path: "*",
    component: NotFound,
    meta: { layout: "error" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes
});

export default router;
