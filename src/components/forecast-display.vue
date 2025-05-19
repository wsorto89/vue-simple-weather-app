<script setup lang="ts">
import { defineProps } from 'vue'
import HourlyForecast from '@/components/hourly-forecast.vue'
import DailyForecast from '@/components/daily-forecast.vue'
import type { Forecast } from '@/types/common'
import { formatDateTime } from '@/utils/time-formatter'

defineProps<{
  forecast: Forecast
}>()
</script>

<template>
  <div class="forecast-display">
    <HourlyForecast :hourlyForecast="forecast.hourly" />
    <DailyForecast :dailyForecast="forecast.daily" />
  </div>
  <footer class="footer">
    Last updated on
    {{
      formatDateTime(new Date(), {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    }}
  </footer>
</template>

<style scoped>
.forecast-display {
  background-image: url('https://images.unsplash.com/photo-1491378630646-3440efa57c3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2glMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww');
  background-size: cover;
  padding: 0.5rem 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.footer {
  background-color: dodgerblue;
  text-align: right;
  color: white;
  padding-right: 0.25rem;
}
</style>
