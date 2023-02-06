import type { ComponentType } from "react"
import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
 
function calculateRelativePosition(event, referenceElement) {
    return {
        x:
            event.pageX -
            referenceElement.offsetLeft -
            (referenceElement.offsetParent
                ? referenceElement.offsetParent.offsetLeft
                : 0),
        y:
            event.pageY -
            referenceElement.offsetTop -
            (referenceElement.offsetParent
                ? referenceElement.offsetParent.offsetTop
                : 0),
    }
}
 
export function Highlight(Component): ComponentType {
    const style = {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        boxSizing: "border-box",
        borderRadius: "inherit",
        WebkitMaskImage: `radial-gradient(circle at center, rgb(255, 255, 255) 0%, rgba(0, 0, 0, 0) 100%)`,
        opacity: 0,
        backgroundImage: `linear-gradient(to right, rgb(77, 104, 243), rgb(138, 97, 255))`,
    }
 
    return (props) => {
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
        const boxRef = useRef()
        const handleMouseMove = (e) =>
            setMousePosition(calculateRelativePosition(e, boxRef.current))
 
        return (
            <Component {...props} ref={boxRef} onMouseMove={handleMouseMove}>
                <motion.div
                    style={style}
                    whileHover={{ opacity: 1 }}
                    animate={{
                        WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(255, 255, 255) 0%, rgba(0, 0, 0, 0) 100%)`,
                    }}
                    transition={{ duration: 0.0 }}
                />
                {props.children}
            </Component>
        )
    }
}
 
