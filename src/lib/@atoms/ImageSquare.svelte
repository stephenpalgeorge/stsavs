<script>
  import { base } from '$lib/config.js';

  export let filePath = "";
  export let altText = "";
  export let link = "";
</script>

<div class="image-square">
  {#if link.length > 0}
    <a href={link}>
      <img src={`${base + filePath}`} alt={altText} />
    </a>
  {:else}
    <img src={`${base + filePath}`} alt={altText} />
  {/if}
</div>