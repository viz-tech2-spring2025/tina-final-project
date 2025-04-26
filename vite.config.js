import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/tina-final-project", // Add this line for GitHub Pages
  plugins: [react()],
})