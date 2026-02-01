import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    supportFile: false, // Disabling support file for simplicity if not needed, or I'll create one
  },
});
