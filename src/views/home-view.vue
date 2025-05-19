<script setup lang="ts">
import { ref, watch } from 'vue'
import ForecastDisplay from '@/components/forecast-display.vue'
import LocationTabs from '@/components/location-tabs.vue'
import type { City } from '@/types/common'
import { useForecast } from '@/composables/use-forecast'

const followedCities = ref<City[]>([
  { name: 'Rio de Janeiro', countryCode: 'BR' },
  { name: 'Beijing', countryCode: 'CN' },
  { name: 'Los Angeles', countryCode: 'US' },
])

const selectedCity = ref<City>({ ...followedCities.value[0] })

const { forecast, loadForecast } = useForecast(selectedCity)

const updateSelectedCity = (city: City) => {
  selectedCity.value = city
}

watch(
  selectedCity,
  // prevent API call if the selected city is the same as the previous one
  (newCity, oldCity) => {
    if (newCity.name !== oldCity?.name || newCity.countryCode !== oldCity?.countryCode) {
      loadForecast()
    }
  },
  { immediate: true },
)
</script>

<template>
  <section class="container">
    <h1 class="header">Simple Weather</h1>
    <LocationTabs
      :followedCities="followedCities"
      @updateSelectedCity="updateSelectedCity"
      :selectedCity="selectedCity"
    />
    <div>
      <ForecastDisplay
        v-if="forecast.hourly.length"
        :forecast="forecast"
        :key="`${selectedCity.name}-${selectedCity.countryCode}`"
      />
      <p v-else class="no-data">No forecast data available</p>
    </div>
  </section>
</template>

<style scoped>
.container {
  background-color: dodgerblue;
}
.header {
  color: white;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  position: relative;
}
.no-data {
  color: white;
  text-align: center;
  margin-top: 2rem;
}
</style>
