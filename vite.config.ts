import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.ZHIPU_API_KEY': JSON.stringify(env.ZHIPU_API_KEY),
        'process.env.ZHIPU_ENDPOINT': JSON.stringify(env.ZHIPU_ENDPOINT),
        'process.env.ZHIPU_MODEL': JSON.stringify(env.ZHIPU_MODEL),
        'process.env.ARK_API_KEY': JSON.stringify(env.ARK_API_KEY),
        'process.env.ARK_ENDPOINT': JSON.stringify(env.ARK_ENDPOINT),
        'process.env.DOUBAO_EP_ID': JSON.stringify(env.DOUBAO_EP_ID)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
