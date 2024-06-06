import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import remarkLinkCard from 'remark-link-card';
import react from "@astrojs/react";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt({
    sitemap: 'https://ear-diary.comsitemap-index.xml'
  }), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), icon(),  react(),playformCompress(), playformInline()],
  site: 'https://ear-diary.com',
  image: {
    remotePatters: [{
      hostname: '**.microcms-assets.io'
    }]
  },
  prefetch: true,
  prefetch: {
    defaultStrategy: 'viewport'
  },
  markdown: {
    remarkPlugins: [[remarkLinkCard, {
      cache: true,
      shortenUrl: true
    }]]
  }
});
