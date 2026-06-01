<template>
  <NavbarComponent />
  <div class="container mt-5 flex-grow-1">
    <RouterView />
  </div>
  <FooterComponent />
</template>

<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>