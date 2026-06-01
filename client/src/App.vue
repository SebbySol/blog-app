<template>
  <NavbarComponent />
  <div class="container mt-5">
    <RouterView />
  </div>
</template>

<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
</script>
