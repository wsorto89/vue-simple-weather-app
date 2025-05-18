import type { ForecastResponse } from '@/types/hourly'
import type { LocationResponse } from '@/types/location'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org'
const GEO_URL = `${BASE_URL}/geo/1.0/direct`
const FORECAST_URL = `${BASE_URL}/data/2.5/forecast`

async function fetchLocation(cityName: string, countryCode: string) {
  try {
    const response = await fetch(`${GEO_URL}?q=${cityName},${countryCode}&appid=${API_KEY}`)
    const data: LocationResponse[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching location data:', error)
    throw error
  }
}

async function fetch5Day3Hour(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    )
    const data: ForecastResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching hourly forecast:', error)
    throw error
  }
}

export async function fetchForecast(cityName: string, countryCode: string) {
  try {
    const locationData = await fetchLocation(cityName, countryCode)
    if (locationData.length === 0) {
      throw new Error('Location not found')
    } else {
      const { lat, lon } = locationData[0]
      const forecastData = await fetch5Day3Hour(lat, lon)
      return { forecast: forecastData }
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    return { forecast: null }
  }
}
