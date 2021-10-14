const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess();

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $atoms: path.resolve('./src/lib/@atoms'),
          $banners: path.resolve('./src/lib/@banners'),
          $media: path.resolve('./src/lib/@media'),
          $molecules: path.resolve('./src/lib/@molecules'),
          $organisms: path.resolve('./src/lib/@organisms'),
        }
      }
    },
    files: {
      assets: 'assets',
    },
  },
  preprocess: preprocess
};
