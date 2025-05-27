<script setup lang="ts">
import { defineProps } from 'vue'
import { imperialLocales } from '@/consts/shared'
import type { DailySummary } from '@/types/daily'
import { formatDateTime } from '@/utils/time-formatter'

defineProps<{
  dailyForecast: DailySummary[]
}>()

const unitSymbol = imperialLocales.includes(navigator.language) ? '°F' : '°C'
</script>

<template>
  <section class="daily-forecast">
    <div class="title">
      <h3 class="title-text">Next 5 Days</h3>
    </div>
    <p v-if="dailyForecast.length === 0">No data available</p>
    <ul class="list">
      <li v-for="day in dailyForecast" :key="day.date" class="day">
        <img
          :src="`http://openweathermap.org/img/wn/${day.icon}@2x.png`"
          :alt="day.description"
          class="icon"
        />
        <div class="daySummary">
          <p class="bold-text">
            {{
              formatDateTime(day.date, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })
            }}
          </p>
          <p class="desc">{{ day.description }}</p>
        </div>
        <div class="temp">
          <p class="bold-text">{{ day.maxTemp.toFixed(0) }}{{ unitSymbol }}</p>
          <p class="bold-text">{{ day.minTemp.toFixed(0) }}{{ unitSymbol }}</p>
        </div>
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

.daily-forecast {
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

.list {
  list-style-type: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: none;
}
.list::-webkit-scrollbar {
  display: none;
}

.day {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  padding: 1rem;
}

.icon {
  width: 50px;
  height: 50px;
}

.daySummary {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
}

.desc {
  color: gray;
}

.temp {
  display: flex;
  gap: 0.5rem;
}

.bold-text {
  font-weight: 500;
}
</style>
