import React, { useState } from "react"

function Counter({ count, setCount }) {
    const reset = () => setCount(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    return (
        <div className="counter">
            <button
                className="button"
                onClick={decrement}
                style={{ opacity: count === 0 ? 0.5 : 1 }}
                disabled={count === 0}
            >
                -
            </button>
            <span className="count">{count}</span>
            <button className="button" onClick={increment}>
                +
            </button>
        </div>
    )
}

const styles = `
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
}

.counter {
  display: flex;
  align-items: center;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 60px;
  color: white;
  margin-bottom: 10px;
}

.count {
  margin: 0 24px;

}

.button {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: all 0.2s;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.button:disabled,
.button:disabled:hover {
  opacity: 0.5;
  cursor: default;
  background-color: transparent;
}

.reset-button {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.2;
  padding: 10px 20px;
  border-radius: 4px;
  transition: all 0.2s;
  margin-top: 0px;
}

.reset-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.reset-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}
`

export function SimpleCounter() {
    const [count, setCount] = useState(0)

    return (
        <div className="container">
            <Counter count={count} setCount={setCount} />
            <button className="reset-button" onClick={() => setCount(0)}>
                reset
            </button>
            <style>{styles}</style>
        </div>
    )
}
