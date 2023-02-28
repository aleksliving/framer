import { useState, useEffect } from "react"
import { Override } from "framer"

interface LocationData {
    city: string
    country_name: string
    region: string
    region_code: string
    emoji_flag: string
}

const useLocation = () => {
    const [location, setLocation] = useState<LocationData | null>(null)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(
                    "https://api.ipdata.co/?api-key=YOUR_API_KEY"
                )
                const data = await response.json()
                setLocation({
                    city: data.city,
                    country_name: data.country_name,
                    region: data.region,
                    region_code: data.region_code,
                    emoji_flag: data.emoji_flag,
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchLocation()
    }, [])

    return location
}

export function VisitorLocation(): Override {
    const location = useLocation()
    return location
        ? {
              text: `${location.city}, ${location.region_code}, ${location.country_name}`,
          }
        : { text: "Loading..." }
}

export function EmojiFlag(): Override {
    const location = useLocation()
    return location
        ? {
              text: `${location.emoji_flag}`,
          }
        : { text: "..." }
}
