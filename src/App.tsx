import { useState, useEffect } from "react"
import { InputField, ProgressCircle } from "./components"

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
    // let interval: NodeJS.Timeout | null = null
    let interval: number | null = null

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xs rounded-xl overflow-hidden flex flex-col bg-[#2a3540]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#1e2730]">
          <h2 className="text-white text-2xl font-medium">Timer</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-300 transition-colors"
          >
            X
          </button>
        </div>

        {/* Timer Display */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 bg-[#3d4c5a]">
          <div className="relative w-48 h-48 mb-8">
            <ProgressCircle seconds={seconds} />
            <div className="absolute inset-0 flex items-center justify-center">
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
              className="bg-[#2a3540] text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#1e2730] transition-colors cursor-pointer"
            >
              {isRunning ? "pause" : "play"}
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
