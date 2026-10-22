import { defineConfig, devices } from '@playwright/test';

// Las pruebas corren contra el sitio compilado (npm run build) servido con astro preview.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4321',
    contextOptions: { reducedMotion: 'reduce' },
    ...(process.env.CHROMIUM_PATH ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } } : {}),
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'npx astro preview --port 4321',
      url: 'http://localhost:4321/',
      reuseExistingServer: !process.env.CI,
    },
    {
      // Sirve los artboards con el renderizador local para compararlos.
      command: 'node tests/servidor-artboards.mjs',
      url: 'http://localhost:4401/docs/diseno/artboards/canvas.json',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
