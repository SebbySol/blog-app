<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="text-center mb-4">Register</h2>
        <div class="card p-4">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input
              type="text"
              class="form-control bg-white text-dark"
              v-model="username"
              placeholder="Enter Username"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control bg-white text-dark"
              v-model="email"
              placeholder="Enter Email"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control bg-white text-dark"
              v-model="password"
              placeholder="Enter Password"
            />
          </div>
          <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
          <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
          <hr>
          <button class="btn btn-custom-register w-100 mt-3" @click="register">Register</button>
          <p class="text-center mt-3 text-secondary">
            Already have an account?
            <RouterLink to="/login" class="text-decoration-none fw-bold">Login</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const username = ref("");
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const router = useRouter();

const register = async () => {
  errorMsg.value = "";
  successMsg.value = "";
  try {
    await api.post("/api/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    successMsg.value = "Registration successful!";
    setTimeout(() => router.push({ name: "Login" }), 1500);
  } catch (err) {
    errorMsg.value = err.response?.data?.error || "Registration failed.";
  }
};
</script>
