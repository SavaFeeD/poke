<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <header>
    <div class="header">
      <img
        class="logo"
        alt="poke logo"
        src="@/assets/images/logo.svg"
      />

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.logo {
  width: 50px;
  padding: 10px 0 10px 20px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  nav {
    margin-left: 30px;
    display: flex;
    gap: 15px;
  }
}
</style>