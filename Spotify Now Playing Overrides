import { useState, useEffect, useRef, ComponentType } from "react"
import { Override } from "framer"

const useSpotifyTrack = () => {
    const [track, setTrack] = useState<{
        name: string
        artists: { name: string }[]
        album: {
            name: string
            images: { height: number; url: string; width: number }[]
        }
    }>()

    const fetchTrack = async () => {
        try {
            const response = await fetch(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization:
                            "Bearer "API_TOKEN_HERE",
                    },
                }
            )
            const data = await response.json()
            if (data.is_playing) {
                setTrack(data.item)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useInterval(fetchTrack, 300)

    return track
        ? {
              name: track.name,
              artistName: track.artists[0].name,
              albumName: track.album.name,
              image: track.album.images[0].url,
          }
        : null
}
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }

        const id = setInterval(() => savedCallback.current(), delay)
        savedCallback.current()

        return () => clearInterval(id)
    }, [delay])
}

export function SpotifyImage(): Override {
    const track = useSpotifyTrack()
    return track
        ? {
              background: {
                  src: track.image,
              },
          }
        : {}
}

export function SpotifyArtistName(props): Override {
    const trackData = useSpotifyTrack()
    return trackData
        ? {
              text: trackData.artistName,
          }
        : {}
}

export function SpotifyTrackName(props): Override {
    const trackData = useSpotifyTrack()
    return trackData
        ? {
              text: trackData.name,
          }
        : {}
}
