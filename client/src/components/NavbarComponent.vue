<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container d-flex justify-content-between align-items-center">
      <RouterLink class="navbar-brand" to="/">Daily<b>Write</b></RouterLink>

      <!-- Hamburger -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <div class="d-flex gap-2 ms-auto mt-2 mt-lg-0">
          <template v-if="!isAuthenticated">
            <RouterLink
              to="/login"
              class="btn nav-login"
              :class="currentPage === 'login' ? 'submit-btn' : 'nav-login'"
            >Login</RouterLink>
            <RouterLink
              to="/register"
              class="nav-register"
              :class="currentPage === 'register' ? 'submit-btn' : 'nav-logout'"
            >Register</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/create" class="btn nav-login">Create Post</RouterLink>
            <button class="btn nav-logout" @click="logout">Logout</button>
          </template>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isAuthenticated = computed(() => userStore.isAuthenticated())

const currentPage = computed(() => {
  if (route.path === '/login') return 'login'
  if (route.path === '/register') return 'register'
  return ''
})

const logout = () => {
  userStore.clearUser()
  router.push('/login')
}
</script>