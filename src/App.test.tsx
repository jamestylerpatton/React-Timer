import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("renders modal initially", () => {
    render(<App />)
    expect(screen.getByText("Timer")).toBeInTheDocument()
  })

  it("toggles timer running state when play/pause button is clicked", () => {
    render(<App />)
    const toggleButton = screen.getByText("pause")
    toggleButton.click()
    expect(screen.getByText("play")).toBeInTheDocument()
    toggleButton.click()
    expect(screen.getByText("pause")).toBeInTheDocument()
  })

  it("closes modal when close button is clicked", () => {
    render(<App />)
    const closeButton = screen.getByText("X")
    closeButton.click()
    expect(screen.queryByText("Timer")).not.toBeInTheDocument()
  })

  it("adds one minute when +1:00 button is clicked", () => {
    render(<App />)
    const addButton = screen.getByText("+1:00")
    addButton.click()
    expect(screen.getByDisplayValue("00:01:00")).toBeInTheDocument()
  })

  it("resets timer when reset button is clicked", () => {
    render(<App />)
    const resetButton = screen.getByText("Reset")
    resetButton.click()
    expect(screen.getByDisplayValue("00:00:00")).toBeInTheDocument()
  })

  it("toggles timer running state when play/pause button is clicked", () => {
    render(<App />)
    const toggleButton = screen.getByText("pause")
    toggleButton.click()
    expect(screen.getByText("play")).toBeInTheDocument()
    toggleButton.click()
    expect(screen.getByText("pause")).toBeInTheDocument()
  })
})
