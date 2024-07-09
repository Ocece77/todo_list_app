import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    reactStrictMode: false,
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_KEY,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    define: {
      'process.env.VITE_QUOTE_API_KEY': JSON.stringify(env.VITE_QUOTE_API_KEY),
      'process.env.VITE_EMAIL_EXAMPLE': JSON.stringify(env.VITE_EMAIL_EXAMPLE),
      'process.env.VITE_PASSWORD_EXAMPLE': JSON.stringify(env.VITE_PASSWORD_EXAMPLE),
      'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
  });
};
