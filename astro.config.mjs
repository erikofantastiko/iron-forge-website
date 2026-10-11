import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// The thanks and 404 pages are noindex, so keep them out of the sitemap.
const NOINDEX_PAGES = ['/thanks', '/404']

export default defineConfig({
  site: 'https://ironforge.app',
  // GitHub Pages serves /legal/ directly and 301-redirects /legal to it, so
  // every generated URL ends in a slash. Search engines then only ever see the
  // final address, never one that redirects.
  trailingSlash: 'always',
  // The CSS is a few KB, so inline it rather than block first paint on an
  // extra request.
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) =>
        !NOINDEX_PAGES.some((path) => page.replace(/\/$/, '').endsWith(path)),
    }),
  ],
})
