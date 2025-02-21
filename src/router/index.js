import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Auth from "../views/Auth.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/auth", component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
