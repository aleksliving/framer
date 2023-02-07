import type { ComponentType } from "react"
import { useState, useEffect } from "react"

import type { MotionValue, Transition } from "framer-motion"
import {
    useScroll, 
    useVelocity,
    useTransform,
    useAnimation,
    useMotionValue,
    animate,
} from "framer-motion"

export function withScrolledProgress(Component): ComponentType {
    const startY = 0 
    const distance = 800
    const endY = startY + distance

    return (props) => {
        const { scrollY } = useScroll()
        const progress = useTransform(scrollY, [startY, endY], [0, 1])

        return <Component {...props} progress={progress} />
    }
}
