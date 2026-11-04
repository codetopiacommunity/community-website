import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    env: {
      JWT_SECRET: "test-secret",
      NEXT_PUBLIC_BASE_URL: "https://example.test/",
      RESEND_NEWSLETTER_SEGMENT_ID: "segment-1",
    },
  },
});
