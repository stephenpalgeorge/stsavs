<script context="module">
  import Metatags from "$lib/Data/Metatags.svelte";
  import { base } from "$lib/config.js";

  /**
	 * @type {import('@sveltejs/kit').Load}
	 */
  export async function load() {
    const url = `${base}/pages`;
    const res = await fetch(url);

    if (res.ok) {
      const pagesData = await res.json();
      const pageDataIndex = pagesData
        .map(page => page.Title.toLowerCase())
        .indexOf("home page");
      return {
        props: {
          data: pagesData[pageDataIndex]
        }
      };
    }
  }
</script>

<script>
  import DynamicZone from "$lib/Layout/DynamicZone.svelte";
  export let data;
  console.log(data);
</script>

<style lang="scss">
  @use '../lib/scss/variables' as var;
  article.page {
    padding-top: var.$nav-height;
  }
</style>

<svelte:head>
  {#if data.metatags}
    <Metatags tags={data.metatags} />
  {/if}
</svelte:head>

<article class="page">
  <header>
    {#if data.header && data.header.length > 0}
      <!-- banner here -->
      <DynamicZone components={data.header} />
    {:else}
      <h1>{data.metatags.title || data.Title}</h1>
    {/if}
  </header>
  <main>
    <DynamicZone components={data.main} />
  </main>
</article>
