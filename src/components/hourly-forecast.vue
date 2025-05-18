<script setup lang="ts">
import type { ThreeHourlyForecastListItemResponse } from '@/types/hourly'
import { defineProps } from 'vue'

defineProps<{ hourlyForecast: ThreeHourlyForecastListItemResponse[] }>()
</script>

<template>
  <section class="hourly-forecast">
    <div class="title">
      <h3 class="title-text">Next hours</h3>
    </div>
    <p v-if="hourlyForecast.length === 0">No data available</p>
    <ul class="carousel">
      <li v-for="hour in hourlyForecast" :key="hour.dt" class="hour">
        <p class="temp">{{ hour.main.temp }}</p>
        <p class="pop">{{ hour.pop }}%</p>
        <img
          :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
          :alt="hour.weather[0].description"
          class="icon"
        />
        <p class="time">
          {{
            new Date(hour.dt * 1000).toLocaleString(undefined, {
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h3 {
  margin: 0;
}

p {
  margin: 0;
}

.hourly-forecast {
  background-color: white;
  border-radius: 4px;
}

.title {
  padding: 1rem;
  border-bottom: 1px solid lightgray;
}

.title-text {
  font-weight: 500;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0;
  scrollbar-width: none;
  list-style-type: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}

.hour {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-right: 1px solid lightgray;
  padding: 1rem;
}

.temp {
  font-weight: 500;
}

.pop {
  color: mediumturquoise;
}

.icon {
  width: 50px;
  height: 50px;
}

.time {
  color: gray;
  width: 100px;
  text-align: center;
}
</style>
