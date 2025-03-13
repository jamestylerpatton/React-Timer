import { useState, useEffect } from "react"
import { InputField, ProgressCircle } from "./components"
import Play from "./assets/caret-right.svg"
import Pause from "./assets/pause.svg"

export default function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [showModal, setShowModal] = useState(true)

  // Format time as MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  // Handle adding 1 minute
  const addMinute = () => {
    setSeconds((prev) => prev + 60)
  }

  // Handle reset
  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  // Toggle timer running state
  const toggleTimer = () => {
    setIsRunning((prev) => !prev)
  }

  // Close the modal
  const closeModal = () => {
    setShowModal(false)
  }

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#263238]">
      <div className="w-full max-w-xs rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#374750] relative">
          <h2 className="text-white text-2xl font-medium w-full text-center">
            Timer
          </h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-300 transition-colors text-2xl absolute top-4 right-4 cursor-pointer w-8"
          >
            &times;
          </button>
        </div>

        {/* Timer Display */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-[#546e7a]">
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <ProgressCircle
                seconds={seconds}
                setInputValue={setSeconds}
                pauseTimer={() => setIsRunning(false)}
              />
            </div>
            <div className="relative">
              <InputField
                isRunning={isRunning}
                setInputValue={setSeconds}
                inputValue={formatTime(seconds)}
                pauseTimer={() => setIsRunning(false)}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between w-full px-4">
            <button
              onClick={addMinute}
              className="text-white text-xl hover:text-gray-300 transition-colors cursor-pointer"
            >
              +1:00
            </button>

            <button
              onClick={toggleTimer}
              className="bg-[#2a3540] text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#1e2730] transition-colors cursor-pointer p-3"
            >
              {isRunning ? <img src={Pause} /> : <img src={Play} />}
            </button>

            <button
              onClick={handleReset}
              className="text-white text-xl hover:text-gray-300 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
