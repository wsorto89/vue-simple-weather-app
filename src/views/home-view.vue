<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchForecast } from '@/api/weather.ts'
import ForecastDisplay from '@/components/forecast-display.vue'
import LocationTabs from '@/components/location-tabs.vue'
import { getSummaryByDate } from '@/utils/group-forecast-by-day.ts'

// for hourly forecast, we only need the first 7 to show a 24-hour forecast
const HOURLY_FORECAST_COUNT = 7

const followedCities = ref([
  { name: 'Rio de Janeiro', countryCode: 'BR' },
  { name: 'Beijing', countryCode: 'CN' },
  { name: 'Los Angeles', countryCode: 'US' },
])

const selectedCity = ref({ ...followedCities.value[0] })

const forecast = ref<{
  hourly: Array<any>
  daily: Array<any>
}>({
  hourly: [],
  daily: [],
})

const getWeatherData = async () => {
  const data = await fetchForecast(selectedCity.value.name, selectedCity.value.countryCode)
  if (data.forecast) {
    const daily = getSummaryByDate(data.forecast.list)
    const today = new Date().toISOString().split('T')[0]
    const futureDays = daily.filter((day) => day.date !== today)
    forecast.value = {
      hourly: data.forecast.list.slice(0, HOURLY_FORECAST_COUNT),
      daily: futureDays,
    }
  } else {
    forecast.value = { hourly: [], daily: [] }
  }
}

const updateSelectedCity = (city: { name: string; countryCode: string }) => {
  selectedCity.value = city
}

watch(selectedCity, getWeatherData, { immediate: true })
</script>

<template>
  <section class="container">
    <h1 class="header">Simple Weather</h1>
    <LocationTabs
      :followedCities="followedCities"
      @updateSelectedCity="updateSelectedCity"
      :selectedCity="selectedCity"
    />
    <ForecastDisplay v-if="forecast.hourly.length" :forecast="forecast" />
    <p v-else class="no-data">No forecast data available</p>
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
