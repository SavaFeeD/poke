import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@page/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@page/Login.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@page/Game.vue"),
    },
  ],
});

export default router;
