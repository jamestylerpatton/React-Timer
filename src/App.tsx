import { useState, useEffect, useRef } from "react"
import { InputField } from "./components"

export default function App() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [showModal, setShowModal] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  // Draw the progress circle
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = canvas.width / 2 - 10

    // Calculate progress (assuming 60 seconds is full circle)
    const progress = (seconds % 60) / 60

    // Draw background circle (dark)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#2a3540"
    ctx.lineWidth = 10
    ctx.stroke()

    // Draw progress arc (white)
    ctx.beginPath()
    ctx.arc(
      centerX,
      centerY,
      radius,
      -Math.PI / 2,
      2 * Math.PI * progress - Math.PI / 2
    )
    ctx.strokeStyle = "white"
    ctx.lineWidth = 10
    ctx.stroke()

    // Draw the circle handle at the end of the progress
    const handleAngle = 2 * Math.PI * progress - Math.PI / 2
    const handleX = centerX + radius * Math.cos(handleAngle)
    const handleY = centerY + radius * Math.sin(handleAngle)

    ctx.beginPath()
    ctx.arc(handleX, handleY, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
  }, [seconds])

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
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="absolute inset-0"
            />
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
