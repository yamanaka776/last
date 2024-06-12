import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import react from "@astrojs/react";
import itsmatteomanfsecurityTxt from "@itsmatteomanf/astro-security-txt";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt({
    sitemap: 'https://ear-diary.comsitemap-index.xml'
  }), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), icon(), react(),itsmatteomanfsecurityTxt({
      contact:'mailto:contact@ear-diary.com',
      preferredLanguages:['en','ja']
    }),playformInline(),playformCompress()],
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
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteBackLabel: 'コンテンツに戻る'
    }
  }
});
