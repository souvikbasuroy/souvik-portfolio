# 🎥 Immersive Cinematic Portfolio

A high-performance, storytelling-driven portfolio website featuring a frame-by-frame canvas animation engine controlled by user scroll. This project aims to provide a "video-like" fluid experience through spring-damped frame transitions and premium, minimalist design.



## ✨ Features

- **Immersive Scroll Engine**: A custom-built `GlobalCanvas` component that scrubs through high-resolution image sequences based on scroll position.
- **Physics-Based Smoothing**: Implements spring-based animation logic to ensure background frame transitions glide fluidly between snap points.
- **Section Snapping**: A deliberate user journey with controlled, section-by-section scroll snapping.
- **Interactive UI**: Premium glassmorphism elements, dynamic profile animations, and micro-interactions powered by **Framer Motion**.
- **Responsive Design**: Optimized for both desktop and mobile devices with adaptive frame-loading to maintain performance.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Custom Design System)

## 📂 Project Structure

- `src/components/GlobalCanvas.jsx`: The core engine handling the frame-by-frame canvas rendering.
- `src/hooks/useScrollHold.js`: Custom hook managing the scroll physics and section locking.
- `src/components/sections/`: Contains all portfolio content sections (About, Projects, Skills, etc.).
- `public/frames/`: Optimized image sequences used for the background animation.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/souvikbasuroy/souvik-portfolio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

To deploy the project to GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy using the `gh-pages` script:
   ```bash
   npm run deploy
   ```

## 👤 Author

**Souvik Basu Roy**
- GitHub: [@souvikbasuroy](https://github.com/souvikbasuroy)
- LinkedIn: [Souvik Basu Roy](https://www.linkedin.com/in/souvik-basu-roy)

---
*Designing the future, one frame at a time.*
