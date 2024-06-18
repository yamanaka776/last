import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import itsmatteomanfsecurityTxt from '@itsmatteomanf/astro-security-txt';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import rehypeAutoAds from "rehype-auto-ads";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt({
    sitemap: 'https://ear-diary.comsitemap-index.xml'
  }), sitemap(), icon(), react(), itsmatteomanfsecurityTxt({
    contact: 'mailto:contact@ear-diary.com',
    preferredLanguages: ['en', 'ja']
  }), playformInline(), playformCompress()],
  site: 'https://ear-diary.com',
  image: {
    remotePatters: [{
      hostname: '**.microcms-assets.io'
    }]
  },
  prefetch: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  markdown: {
    rehypePlugins: [[rehypeAutoAds, { adCode: '<div class="mx-auto"></div>', countFrom: 2, paragraphInterval: 5 }]],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る'
    }
  }
});
