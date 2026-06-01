import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Post from "../pages/Post.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import CreatePost from "../pages/CreatePost.vue";
import EditPost from '../pages/EditPost.vue'
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/post/:id", name: "Post", component: Post },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/create", name: "CreatePost", component: CreatePost },
  { path: '/post/:id/edit', name: 'EditPost', component: EditPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router;
