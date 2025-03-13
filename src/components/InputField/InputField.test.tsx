import { describe, it, expect, vi } from "vitest"
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { InputField } from "./InputField"

describe("InputField", () => {
  it("renders span with input value when isRunning is true", () => {
    render(
      <InputField
        isRunning={true}
        setInputValue={vi.fn()}
        inputValue="00:00"
        pauseTimer={vi.fn()}
      />
    )
    expect(screen.getByText("00:00")).toBeInTheDocument()
  })

  it("renders input field with input value when isRunning is false", () => {
    render(
      <InputField
        isRunning={false}
        setInputValue={vi.fn()}
        inputValue="00:00"
        pauseTimer={vi.fn()}
      />
    )
    expect(screen.getByDisplayValue("00:00")).toBeInTheDocument()
  })

  it("renders input field with larger input value when isRunning is false", () => {
    render(
      <InputField
        isRunning={false}
        setInputValue={vi.fn()}
        inputValue="00:30"
        pauseTimer={vi.fn()}
      />
    )
    expect(screen.getByDisplayValue("00:30")).toBeInTheDocument()
  })

  it("updates local value on input change", () => {
    render(
      <InputField
        isRunning={false}
        setInputValue={vi.fn()}
        inputValue="00:00"
        pauseTimer={vi.fn()}
      />
    )
    const input = screen.getByDisplayValue("00:00")
    fireEvent.change(input, { target: { value: "00:01" } })
    expect(input).toHaveValue("00:01")
  })
})
