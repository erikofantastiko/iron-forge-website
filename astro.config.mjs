import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// The thanks, legal, privacy and 404 pages are noindex, so keep them out of
// the sitemap. Only the home page is meant to be discovered by search engines.
const NOINDEX_PAGES = ['/thanks', '/legal', '/privacy', '/404']

export default defineConfig({
  site: 'https://ironforge.app',
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
