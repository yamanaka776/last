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
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt({
    sitemap: 'https://ear-diary.com/sitemap-index.xml'
  }), sitemap(), icon(), react(), itsmatteomanfsecurityTxt({
    contact: 'mailto:contact@ear-diary.com',
    preferredLanguages: ['en', 'ja']
  }), partytown({
    // Example: Add dataLayer.push as a forwarding-event.
    config: {
      forward: ['dataLayer.push']
    }
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
    rehypePlugins: [[rehypeAutoAds, {
      adCode: '<div class="mx-auto"></div>',
      countFrom: 2,
      paragraphInterval: 5
    }]],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る'
    }
  }
});
