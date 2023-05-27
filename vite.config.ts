import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: path.normalize(__dirname + "\\dist").replaceAll("\\", "/"),
  plugins: [vue()],
});
