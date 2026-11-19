// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Only the separate export command enables prerendering; Lovable stays unchanged.
const staticExport = process.env["STATIC_EXPORT"] === "true";

export default defineConfig({
  ...(staticExport ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport ? {
      pages: [{ path: "/" }],
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
    } : {}),
  },
  vite: {
    ...(staticExport ? {
      environments: {
        client: { build: { outDir: "dist/static" } },
        ssr: { build: { outDir: ".tanstack/static-server" } },
      },
    } : {}),
    // Pre-bundle Embla at server start: discovering it on first import makes Vite
    // re-optimize mid-session, which blanks the page with a null React inside the carousel.
    optimizeDeps: { include: ["embla-carousel-react", "embla-carousel-autoplay"] },
  },
});
