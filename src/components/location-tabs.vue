<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  followedCities: {
    name: string
    countryCode: string
  }[]
  selectedCity: {
    name: string
    countryCode: string
  }
}>()

const emit = defineEmits<{
  (e: 'updateSelectedCity', city: { name: string; countryCode: string }): void
}>()
</script>

<template>
  <div class="tab-buttons">
    <button
      v-for="city in followedCities"
      :key="`${city.name}-${city.countryCode}`"
      @click="emit('updateSelectedCity', city)"
      :class="{
        active: selectedCity.name === city.name && selectedCity.countryCode === city.countryCode,
      }"
    >
      {{ city.name }}
    </button>
  </div>
</template>

<style scoped>
.tab-buttons {
  display: flex;
  border-bottom: none;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  background-color: white;
}
.tab-buttons button {
  background-color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  transition:
    background-color 0.3s,
    font-weight 0.3s;
}
.tab-buttons button:hover {
  background-color: lightgray;
}
.tab-buttons button.active {
  font-weight: bold;
  border-bottom: 2px solid orange;
}
</style>
