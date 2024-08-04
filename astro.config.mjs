import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [mdx(), tailwind({
    applyBaseStyles: false
  }), compress(), preact()]
});