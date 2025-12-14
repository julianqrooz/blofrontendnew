import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyBlogView from "../views/MyBlogView.vue";
import CreateBlogView from "../views/CreateBlogView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PostDetils from "../views/PostDetils.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import TermsView from "../views/TermsView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/my-blog",
      component: MyBlogView,
    },
    {
      path: "/create",
      component: CreateBlogView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/register",
      component: RegisterView,
    },
    {
      path: "/post/:id",
      component: PostDetils,
    },
    {
      path: "/privacy",
      component: PrivacyPolicyView,
    },
    {
      path: "/terms",
      component: TermsView,
    },
    {
      path: "/contact",
      component: ContactView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) next("/login");
  else next();
});
export default router;
