import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// The thanks, legal and privacy pages are noindex, so keep them out of the
// sitemap. Only the home page is meant to be discovered by search engines.
const NOINDEX_PAGES = ['/thanks', '/legal', '/privacy']

export default defineConfig({
  site: 'https://ironforge.app',
  integrations: [
    sitemap({
      filter: (page) =>
        !NOINDEX_PAGES.some((path) => page.replace(/\/$/, '').endsWith(path)),
    }),
  ],
})
