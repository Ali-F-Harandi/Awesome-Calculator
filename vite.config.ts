import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Changing base to './' makes asset paths relative.
  // This ensures the app works on GitHub Pages AND when hosted on a local server in any folder.
  // Note: It still requires a local server (like Live Server) due to browser CORS security on file:// protocol.
  base: './', 
  build: {
    outDir: 'dist',
  }
})