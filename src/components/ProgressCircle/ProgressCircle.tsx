import { useEffect, useState } from "react"
import CircularSlider from "react-circular-slider-svg"

export function ProgressCircle({
  seconds,
  setInputValue,
  pauseTimer,
}: {
  seconds: number
  setInputValue: (value: number) => void
  pauseTimer: () => void
}) {
  const [trackValue, setTrackValue] = useState(0)

  useEffect(() => {
    setTrackValue(seconds % 60)
  }, [seconds])

  const handleTrackChange = (val: number) => {
    pauseTimer()
    setInputValue(seconds - (seconds % 60) + Math.round(val))
    setTrackValue(val)
  }

  return (
    <CircularSlider
      size={200}
      trackWidth={8}
      minValue={0}
      maxValue={60}
      startAngle={0}
      endAngle={360}
      angleType={{
        direction: "cw",
        axis: "+y",
      }}
      handle1={{
        value: trackValue,
        onChange: handleTrackChange,
      }}
      arcColor="#FFFFFF"
      arcBackgroundColor="#2a3540"
    />
  )
}
