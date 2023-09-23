<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="navbar">
    <div class="wrapper">
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/news" class="nav-link">News</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Add scoped attribute to ensure the styles only apply to this component */

.navbar {
  background-color: #007bff;
  color: #fff;
  padding: 10px 0;
  margin-bottom: 10px;
}

.wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  margin: 0 15px;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #ffcc00; /* Change the color on hover */
}
</style>

