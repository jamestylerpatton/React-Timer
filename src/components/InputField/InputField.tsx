import { useState, useEffect, useRef } from "react"
import { getSecondsFromHHMMSS } from "../../utils"

export function InputField({
  isRunning,
  setInputValue,
  inputValue,
  pauseTimer,
}: {
  isRunning: boolean
  setInputValue: (value: number) => void
  inputValue: string
  pauseTimer: () => void
}) {
  // Ref for input field
  const ref = useRef<HTMLInputElement>(null)

  // Use local value for input field
  const [localValue, setLocalValue] = useState(inputValue)

  // Update local value when input value changes
  useEffect(() => {
    setLocalValue(inputValue)
  }, [inputValue])

  // Handle input change
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    // Do not allow any non-numeric characters or colons
    if (!/^[0-9:]*$/.test(value)) return

    setLocalValue(e.target.value)
  }

  // Pause timer and focus input field
  const pauseAndFocus = () => {
    pauseTimer()

    // Focus input field
    setTimeout(() => {
      ref.current?.focus()
    }, 10)
  }

  return isRunning ? (
    <span className="text-white text-4xl" onClick={pauseAndFocus}>
      {inputValue}
    </span>
  ) : (
    <input
      ref={ref}
      type="text"
      maxLength={5}
      pattern="[0-9\:]"
      value={localValue}
      onChange={handleInput}
      onBlur={() => {
        setInputValue(getSecondsFromHHMMSS(localValue))
      }}
      className="w-[120px] text-center text-white text-4xl"
    />
  )
}
