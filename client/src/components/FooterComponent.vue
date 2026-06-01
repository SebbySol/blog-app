<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row align-items-center py-4">
        <!-- Left - Brand -->
        <div class="col-md-4">
          <h3 class="footer-brand">Daily<b>Write</b></h3>
        </div>

        <!-- Center - Links -->
        <div class="col-md-4 text-center">
          <RouterLink to="/" class="footer-link me-3">Home</RouterLink>
          <RouterLink to="/login" class="footer-link me-3">Login</RouterLink>
          <RouterLink to="/register" class="footer-link">Register</RouterLink>
        </div>

        <!-- Right - Copyright -->
        <div class="col-md-4 text-end">
          <p class="mb-0 footer-copy">© 2026 DailyWrite. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>