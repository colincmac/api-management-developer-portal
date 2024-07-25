import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // ENV is required to be set explicitly with Vite. This is a workaround to load the .env file
  const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [react()],
  base: "",
  server: {
	"port": 3000,
	"open": `${env.APIM_DEVPORTAL_URL}/?MS_APIM_CW_localhost_port=3000`
  },
  define: {
    "process.env": env,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "./index.html",
        editor: "./editor.html",
        asyncapi: "./src/component/asyncapi.tsx"
      },
    },
  },
  publicDir: "static",
}})
