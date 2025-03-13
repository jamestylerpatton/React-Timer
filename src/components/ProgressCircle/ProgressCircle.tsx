import { useEffect, useRef } from "react"

export function ProgressCircle({ seconds }: { seconds: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="absolute inset-0"
    />
  )
}
