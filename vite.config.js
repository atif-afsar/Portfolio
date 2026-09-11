import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function apiDevPlugin() {
  return {
    name: 'api-chat-dev-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }

            res.status = function (code) {
              res.statusCode = code;
              return res;
            };
            res.json = function (data) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            try {
              const chatModule = await server.ssrLoadModule('/api/chat.js');
              await chatModule.default(req, res);
            } catch (err) {
              console.error('API dev handler error:', err);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevPlugin()],
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          'vendor-icons': ['react-icons', 'lucide-react', '@heroicons/react'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Section chunks for lazy loading
          'section-hero': ['./src/sections/Hero.jsx'],
          'section-projects': ['./src/sections/Projects.jsx'],
          'section-experience': ['./src/sections/Experience.jsx'],
          'section-services': ['./src/sections/MyServices.jsx'],
        }
      }
    },
    // Optimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    // Source maps only in dev
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    // Optimize images
    assetsInlineLimit: 4096,
    // Reduce initial bundle
    reportCompressedSize: false,
    // Optimize for production
    target: 'esnext',
    modulePreload: {
      polyfill: false
    }
  },
  // Performance optimizations
  server: {
    middlewareMode: false,
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'framer-motion'],
    exclude: ['node_modules/.vite']
  }
})

