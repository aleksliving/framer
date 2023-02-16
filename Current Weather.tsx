import { useState, useEffect, useRef, ComponentType } from "react"

import { Override, Data, Color, Frame } from "framer"

const API_KEY = "PASTE_API_KEY_HERE" // You can grab one at openweathermap.org
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`

interface WeatherData {
    temperature: number
    condition: string
    HLcondition: string
    icon: string
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sunset: number
    sunrise: number
    feels_like: number
    name: string
}

// adjust colors and temp ranges as you see fit

const getColor = (temp: number) => {
    if (temp < -20) {
        return "#0099FF"
    } else if (temp >= -20 && temp < -10) {
        return "#01CCFF"
    } else if (temp >= -10 && temp < -0) {
        return "#A0E6FF"
    } else if (temp >= 0 && temp < 5) {
        return "#D0F7FC"
    } else if (temp >= 5 && temp < 10) {
        return "#FCFEE6"
    } else if (temp >= 10 && temp < 20) {
        return "#FAFA80"
    } else if (temp >= 20 && temp < 30) {
        return "#FFCA00"
    } else if (temp >= 30) {
        return "#FF9835"
    }
}

const weatherData = Data({
    location: "Yangon",
})

const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null)

    const fetchWeather = async (location: string) => {
        try {
            const response = await fetch(`${API_URL}&q=${location}`)
            const data = await response.json()
            const { temp, temp_min, temp_max, feels_like, pressure, humidity } =
                data.main
            const { sunset, sunrise } = data.sys
            const { description, main, icon } = data.weather[0]

            setWeather({
                temperature: temp,
                condition: description,
                HLcondition: main,
                sunset,
                sunrise,
                icon,
                temp_min,
                temp_max,
                feels_like,
                pressure,
                humidity,
                name: data.name,
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchWeather(weatherData.location)
        const interval = setInterval(fetchWeather, 600000)
        return () => clearInterval(interval)
    }, [weatherData.location])

    return weather
}

export function Temerature(): Override {
    const weather = useWeather()

    return weather
        ? { text: `${Math.round(weather.temperature)}°` }
        : { text: "Loading..." }
}

export function Conditions(): Override {
    const weather = useWeather()
    return weather ? { text: `${weather.condition}` } : { text: "Loading..." }
}

export function DetailedConditions(): Override {
    const weather = useWeather()
    return weather ? { text: `${weather.HLcondition}` } : { text: "Loading..." }
}

export function City(): Override {
    const weather = useWeather()
    return weather ? { text: `${weather.name}` } : { text: "Loading..." }
}

export function ConditionIcon(): Override {
    const weather = useWeather()
    return weather
        ? {
              background: {
                  src: `http://openweathermap.org/img/wn/${weather.icon}.png`,
              },
          }
        : {}
}

export function LowTemp(): Override {
    const weather = useWeather()
    return weather ? { text: `${Math.round(weather.temp_min)}°` } : {}
}

export function MaxTemp(): Override {
    const weather = useWeather()
    return weather ? { text: `${Math.round(weather.temp_max)}°` } : {}
}

export function FeelsLike(): Override {
    const weather = useWeather()
    return weather ? { text: `${Math.round(weather.feels_like)}°` } : {}
}

export function Pressure(): Override {
    const weather = useWeather()
    return weather ? { text: `${Math.round(weather.pressure)}` } : {}
}
export function Humidity(): Override {
    const weather = useWeather()
    return weather ? { text: `${Math.round(weather.humidity)}%` } : {}
}

export const TempColor = (Component): ComponentType => {
    return (props) => {
        const weather = useWeather()
        return (
            <Component
                {...props}
                style={
                    weather ? { background: getColor(weather.temperature) } : {}
                }
            />
        )
    }
}

export function Sunset(): Override {
    const weather = useWeather()
    const sunset = new Date(weather?.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })
    return weather ? { text: `${sunsetTime}` } : {}
}

export function Sunrise(): Override {
    const weather = useWeather()
    const sunrise = new Date(weather?.sunrise * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })
    return weather ? { text: `${sunriseTime}` } : {}
}
