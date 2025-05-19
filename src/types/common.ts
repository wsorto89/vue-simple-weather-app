import type { DailySummary } from './daily'
import type { ThreeHourlyForecastListItemResponse } from './hourly'

export type City = {
  name: string
  countryCode: string
}

export type Forecast = {
  hourly: ThreeHourlyForecastListItemResponse[]
  daily: DailySummary[]
}

export type CityOption = {
  city_id: number
  city_name: string
  state_code: string
  country_code: string
  country_full: string
  lat: number
  lon: number
}
