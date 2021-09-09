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
          $molecules: path.resolve('./src/lib/@molecules'),
        }
      }
    },
    files: {
      assets: 'static',
    },
  },
  preprocess: preprocess
};
