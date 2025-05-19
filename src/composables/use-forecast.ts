import { ref, type Ref } from 'vue'
import { fetchForecast } from '@/api/weather'
import { imperialLocales } from '@/consts/shared'
import { getSummaryByDay } from '@/utils/group-forecast-by-day'
import type { City, Forecast } from '@/types/common'

// For hourly forecast, we will show 8 items (3 hours each) = 24 hours
const HOURLY_FORECAST_COUNT = 8

export function useForecast(city: Ref<City>) {
  const forecast = ref<Forecast>({ hourly: [], daily: [] })
  const isLoading = ref(false)

  const loadForecast = async () => {
    isLoading.value = true
    const data = await fetchForecast(
      city.value.name,
      city.value.countryCode,
      imperialLocales.includes(navigator.language),
    )
    if (data.forecast) {
      const daily = getSummaryByDay(data.forecast.list, data.forecast.city.timezone)
      const now = new Date()
      const localTime = new Date(now.getTime() + data.forecast.city.timezone * 1000)
      const today = localTime.toISOString().split('T')[0]
      forecast.value = {
        hourly: data.forecast.list.slice(0, HOURLY_FORECAST_COUNT),
        daily: daily.filter((day) => day.date !== today),
      }
    } else {
      forecast.value = { hourly: [], daily: [] }
    }
    isLoading.value = false
  }

  return { forecast, loadForecast, isLoading }
}
