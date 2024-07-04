import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import dotenv from "dotenv";

dotenv.config();

export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    reactStrictMode: false,

    plugins: [react()],
    define: {
      'process.env.QUOTE_API_KEY': JSON.stringify(env.QUOTE_API_KEY)
    },
  });
};
