<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="text-center mb-4">Login</h2>
        <div class="card p-4">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Enter Email"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Enter Password"
            />
          </div>
          <hr class="mb-4" />
          <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
          <button class="btn btn-custom-login w-100" @click="login">Login</button>
          <p class="text-center mt-3 text-secondary">
            Don't have an account?
            <RouterLink to="/register" class="text-decoration-none fw-bold">Register</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import api from "../api";
import { jwtDecode } from "jwt-decode";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  errorMsg.value = "";
  try {
    const res = await api.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });
    const token = res.data.token;
    const decoded = jwtDecode(token);
    userStore.setUser(token, decoded.role === "admin", res.data.username);
    router.push({ name: "Home" });
  } catch (err) {
    errorMsg.value = err.response?.data?.error || "Login failed.";
  }
};
</script>
