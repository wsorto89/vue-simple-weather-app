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
