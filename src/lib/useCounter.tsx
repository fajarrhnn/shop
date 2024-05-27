import { useState } from "react"

export const useCounter = () => {
    const [count, setCount] = useState(1)

    const increase = () => {
        setCount((prev) => prev + 1)
    }

    const decrease = () => {
        if (count > 1) {
            setCount((prev) => prev - 1)
        } else if (count === 1) {
            setCount(1)
        }
    }

    return { count, increase, decrease }
}