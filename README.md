# Understanding the Essence of Typography

An interactive educational website that teaches typography through motion, exploration, and small game-based activities. The project is built with React and Vite and presents typography as a guided learning journey instead of a static reference page.

## About The Website

This website introduces users to the fundamentals of typography through a sequence of visual and interactive modules. It is designed to help learners understand how type works structurally, emotionally, and strategically in design.

The experience starts with a cinematic landing page and then moves through nine connected sections:

1. Typography Anatomy Explorer
2. Anatomy Quiz
3. Typeface Classification Explorer
4. Font Sorting Game
5. Serif vs Sans-Serif Comparison
6. Psychology of Fonts
7. Expressive Typography
8. Typography Poster Analysis
9. Brand Identity Analysis

The site ends with a results screen that summarizes the learner's performance across the scored activities.

## What Users Can Learn

- the key anatomical parts of letterforms such as baseline, x-height, ascender, descender, stem, counter, and ligature
- the difference between major typeface categories
- how to recognize serif, sans-serif, script, display, and monospace fonts
- when serif and sans-serif fonts are commonly used
- how typography influences tone, perception, and brand identity
- how layout, spacing, scale, and font choice can express emotion
- how typography supports posters, branding, and visual hierarchy

## Key Features

- Animated landing page with section cards and direct section access
- Progress bar that tracks movement through the learning journey
- Interactive anatomy diagram with highlight overlays and definitions
- Multiple-choice anatomy quiz with feedback and scoring
- Expandable typeface cards with editable sample text
- Drag-and-drop font sorting game using `@dnd-kit`
- Readability lab for comparing serif and sans-serif fonts
- Font psychology showcase with trait mapping and quiz questions
- Expressive typography compositions for emotions like joy, fear, anger, serenity, excitement, and melancholy
- Printable poster analysis section with download / print support
- Brand case studies for Apple, Google, and Nike
- Final results screen with percentage score, grade messaging, and replay option

## Tech Stack

- React 19
- Vite
- Framer Motion
- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
- `html2canvas`
- Google Fonts

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Folder Overview

```text
ta-v1/
|-- public/
|   `-- brands/
|-- src/
|   |-- assets/
|   |-- components/
|   |-- data/
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
`-- vite.config.js
```

## Educational Focus

This project is especially useful for:

- beginner typography learners
- design students
- frontend learners exploring interactive educational UI
- portfolio presentation of motion-rich React work

## Summary

This codebase is a visually rich typography learning platform that combines education, interaction, and presentation design. It teaches users how typography works, how it feels, and how it shapes communication in real design contexts.
