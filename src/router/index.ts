import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Routes from "../components/routes/router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = Routes;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
