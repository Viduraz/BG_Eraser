import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * COOP + COEP headers are required for SharedArrayBuffer,
   * which @imgly/background-removal uses for its WASM workers.
   * Without these, the library falls back to a slower single-thread path.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },

  // Silence the Turbopack vs webpack config warning
  turbopack: {},
};

export default withNextIntl(nextConfig);
