import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

export function Toggle(props) {
    const [state, setState] = React.useState({
        isOn: props.isOn,
    })

    const flipSwitch = () => {
        setState({
            isOn: !state.isOn,
        })
    }

    return (
        <Frame
            height={44}
            width={72}
            center
            radius={25}
            onTap={flipSwitch}
            variants={{
                off: { background: "#BBBBBB" },
                on: { background: props.onColor },
            }}
            initial={state.isOn ? "on" : "off"}
            animate={state.isOn ? "on" : "off"}
            transition={{
                type: "tween",
                duration: 0.2,
            }}
        >
            <Frame
                size={36}
                top={4}
                left={4}
                radius={"100%"}
                background="#FFFFFF"
                variants={{
                    off: { x: 0 },
                    on: { x: 28 },
                }}
                transition={{
                    type: "tween",
                    duration: 0.2,
                }}
            />
        </Frame>
    )
}

addPropertyControls(Toggle, {
    isOn: {
        type: ControlType.Boolean,
        title: "On",
        defaultValue: false,
    },
    onColor: {
        type: ControlType.Color,
        title: "On Color",
        defaultValue: "#4E00F2",
    },
    toggleColor: {
        type: ControlType.Color,
        title: "Toggle Color",
        defaultValue: "#DDDDDD",
    },
})
