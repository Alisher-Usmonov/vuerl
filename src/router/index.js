import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import StatsView from "../views/StatsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/dashboard/:id",
    name: "stats-view",
    component: StatsView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
