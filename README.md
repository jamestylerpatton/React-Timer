# Timer - React + TypeScript + Vite

Built from the React + TypeScript + Vite template.
Styling with TailwindCSS.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

- `npm i` to install dependencies
- `npm run dev` to start local server
- `npm run build && npm run preview` to build and serve static version

## Features & Requirements
- The radial progress capture is animated and updated in real time
- Set the time by typing into the digital clock readout in the center of the timer
- Accessibility - keyboard navigation allows you to access all features of the timer
- Tests - using Vitest and React Testing Library
- Add or remove time by dragging the button on the radial progress

## Notes & thoughts

- This project was initially started using Vercel's [V0.dev](https://v0.dev/). While the generated code lacked many of the features & requirements, and needed some serious styling adjustments, it provided an excellent foundation to get started.
- The code generated from V0.dev used canvas for the radial progress bar. I converted to an open-source (SVG) library ([react-circular-slider-svg](https://github.com/mnkhouri/react-circular-slider)) to handle the draggable progress button. Given more time, I'd love to try reimplementing this with canvas—just for fun!
- Additionally, if given more time, I would also implement Web Workers to increase the accuracy of the timer ([more info here](https://hackwild.com/article/web-worker-timers/)). This is a technique I've successfully used in previous projects.
