<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="container">
    <h1>404 Not Found</h1>
    <p>This page does not exist</p>
    <RouterLink to="/">Go Home</RouterLink>
  </section>
</template>

<style scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
