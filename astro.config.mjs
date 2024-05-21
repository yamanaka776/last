import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt({
    sitemap: 'https://ear-diary.comsitemap-index.xml'
  }), sitemap(), playformCompress(), playformInline(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), icon(), react()],
  site: 'https://ear-diary.com',
  image: {
    remotePatters: [{
      hostname: '**.microcms-assets.io'
    }]
  }
});