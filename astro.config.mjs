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
import mdx from "@astrojs/mdx";
import remarkLinkCard from 'remark-link-card';
import emoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw'
import rehypeExternalLinks from 'rehype-external-links'
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
  }), playformInline(), playformCompress(), mdx()],
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
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          shortenUrl: true,
        },
      ],
      [emoji,{accessible: true }]
    ],
    rehypePlugins: [
rehypeRaw,
      [
        rehypeExternalLinks,
        { target: '_blank', 
          rel:[noopener] 
        },
      ],
      [rehypeAutoAds, {
      adCode: '<div class="mx-auto"></div>',
      countFrom: 2,
      paragraphInterval: 5
    }]],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る'
    },
  }
});
