import type { DailySummary } from '@/types/daily'
import type { ThreeHourlyForecastListItemResponse } from '@/types/hourly'

/**
 * Groups the forecast data by day.
 * @param forecastList - The list of forecast data to group.
 * @param timeZoneOffset - The timezone offset to apply to the forecast data to get local time
 * @returns A record of forecast data grouped by day.
 */
function groupForecastByDay(
  forecastList: ThreeHourlyForecastListItemResponse[],
  timeZoneOffset: number,
): Record<string, ThreeHourlyForecastListItemResponse[]> {
  const result: Record<string, ThreeHourlyForecastListItemResponse[]> = {}
  return forecastList.reduce((acc, cur) => {
    const date = new Date((cur.dt + timeZoneOffset) * 1000).toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(cur)
    return acc
  }, result)
}

export function getSummaryByDay(
  forecastList: ThreeHourlyForecastListItemResponse[],
  timeZoneOffset: number,
): DailySummary[] {
  const groupedForecast = groupForecastByDay(forecastList, timeZoneOffset)
  return Object.entries(groupedForecast).map(([date, forecasts]) => {
    const temps = forecasts.map((f) => f.main.temp)
    // Get the middle item to get the weather icon and description to get the middle of the day
    const weather = forecasts[Math.floor(forecasts.length / 2)].weather[0]
    return {
      date,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      icon: weather.icon,
      description: weather.description,
    }
  })
}
