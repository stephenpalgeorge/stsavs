<script>
  import { onMount} from 'svelte';
  import { base } from '$lib/config.js';
  import ImageSquare from '$lib/@atoms/ImageSquare.svelte';
  import TextSquare from '$lib/@atoms/TextSquare.svelte';

  export let bannerId = "";
  export let colorTheme = "light";

  async function getBanner(id) {
    const res = await window.fetch(`${base}/banners/${id}`);
    const data = await res.json();
    return data;
  };

  let banner = getBanner(bannerId);
</script>

<section class="gallery-banner">
  <div class="cards-container">
    {#await banner}
      <p>Loading banner...</p>
    {:then contents}
      {#if contents.cards.length > 0}
        {#each contents.cards as card}
          {#if card.__component === "atoms.image"}
            <ImageSquare filePath={card.image.url} altText={card.image.alternativeText} link={card.link} />
          {:else if card.__component === "atoms.text-square"}
            <TextSquare color={card.colour} text={card.Content} link={card.link} />
          {:else}
            <div>banner content</div>
          {/if}
        {/each}
      {/if}
    {:catch error}
      <p>Error loading banner...</p>
    {/await}
  </div>
</section>