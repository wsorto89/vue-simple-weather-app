import type { ForecastResponse } from '@/types/hourly'
import type { LocationResponse } from '@/types/location'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

// Using OpenWeatherMap API
// https://openweathermap.org/api/
const BASE_URL = 'https://api.openweathermap.org'
const GEO_URL = `${BASE_URL}/geo/1.0/direct`
const FORECAST_URL = `${BASE_URL}/data/2.5/forecast`

/**
 * Fetch the location data for a specific city. Particularly useful for getting the latitude and longitude of the city.
 * This is necessary for fetching the weather forecast.
 * @param cityName - The name of the city.
 * @param countryCode - The ISO 3166 country code. For example, 'US' for the United States.
 * @returns The location data for the city.
 */
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

/**
 * Get the weather forecast for a specific location in 3 hour intervals for 5 days.
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @param useImperial - Whether to use imperial units (Fahrenheit) or metric units (Celsius).
 * @returns The hourly weather forecast data.
 */
async function fetch5Day3Hour(lat: number, lon: number, useImperial: boolean) {
  try {
    const response = await fetch(
      `${FORECAST_URL}?units=${useImperial ? 'imperial' : 'metric'}&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    )
    const data: ForecastResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching hourly forecast:', error)
    throw error
  }
}

/**
 * Fetch the weather forecast for a specific city.
 * @param cityName - The name of the city.
 * @param countryCode - The ISO 3166 country code.
 * @param useImperial - Whether to use imperial units (Fahrenheit) or metric units (Celsius).
 * @returns The weather forecast data.
 */
export async function fetchForecast(
  cityName: string,
  countryCode: string,
  useImperial: boolean = false,
) {
  try {
    const locationData = await fetchLocation(cityName, countryCode)
    if (locationData.length === 0) {
      throw new Error('Location not found')
    } else {
      const { lat, lon } = locationData[0]
      const forecastData = await fetch5Day3Hour(lat, lon, useImperial)
      return { forecast: forecastData }
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    return { forecast: null }
  }
}
