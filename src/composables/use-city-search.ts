import { ref, type Ref, watch } from 'vue'
import type { City, CityOption } from '@/types/common'
import cityOptions from '@/assets/cities.json'

const MAX_CITY_SUGGESTIONS = 5

export function useCitySearch(
  followedCities: Ref<City[]>,
  updateSelectedCity: (city: City) => void,
) {
  const citySearchText = ref('')
  const suggestions = ref<CityOption[]>([])

  const addCity = (city: CityOption) => {
    followedCities.value.push({
      name: city.city_name,
      countryCode: city.country_code,
    })
    citySearchText.value = ''
    suggestions.value = []
    updateSelectedCity({
      name: city.city_name,
      countryCode: city.country_code,
    })
  }

  watch(citySearchText, (val) => {
    if (val.length < 2) {
      suggestions.value = []
      return
    }

    const searchTerm = val.toLowerCase()
    suggestions.value = (cityOptions as CityOption[])
      .filter((city) => city.city_name.toLowerCase().startsWith(searchTerm))
      .filter(
        (city) =>
          !followedCities.value.some(
            (c) => c.name === city.city_name && c.countryCode === city.country_code,
          ),
      )
      .slice(0, MAX_CITY_SUGGESTIONS)
  })

  return {
    citySearchText,
    suggestions,
    addCity,
  }
}
