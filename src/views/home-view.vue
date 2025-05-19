<script setup lang="ts">
import { ref, watch } from 'vue'
import ForecastDisplay from '@/components/forecast-display.vue'
import LocationTabs from '@/components/location-tabs.vue'
import type { City } from '@/types/common'
import { useForecast } from '@/composables/use-forecast'
import { useCitySearch } from '@/composables/use-city-search'

const followedCities = ref<City[]>([
  { name: 'Rio de Janeiro', countryCode: 'BR' },
  { name: 'Beijing', countryCode: 'CN' },
  { name: 'Los Angeles', countryCode: 'US' },
])
const selectedCity = ref<City>({ ...followedCities.value[0] })

const updateSelectedCity = (city: City) => {
  selectedCity.value = city
}

const { forecast, loadForecast } = useForecast(selectedCity)
const { citySearchText, suggestions, addCity } = useCitySearch(followedCities, updateSelectedCity)

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
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      "
    >
      <h1 class="header">Simple Weather</h1>
      <input v-model="citySearchText" placeholder="Search cities..." class="search-input" />
    </div>
    <ul v-if="suggestions.length" class="suggestions">
      <li v-for="city in suggestions" :key="city.city_id" @click="addCity(city)">
        {{ city.city_name }}, {{ city.country_full }}
      </li>
    </ul>

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
  position: relative;
}
.no-data {
  color: white;
  text-align: center;
  margin-top: 2rem;
}
</style>
