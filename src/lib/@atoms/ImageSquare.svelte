<script>
  import { base } from '$lib/config.js';

  export let filePath = "";
  export let altText = "";
  export let link = "";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .image-square {
    position: relative;
    width: var.$banner-square-side;
    padding-bottom: var.$banner-square-side;
    height: 0;

    @include m.layout-break(sm) {
      margin: var.$banner-card-gap 0;
      width: var.$banner-square-side * 2;
      padding-bottom: var.$banner-square-side * 2;
    }
    
    transition: box-shadow .2s ease;
    &:hover {
      box-shadow: var.$shadow-base;
    }
  }

  .image-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 25%;
    }
  }
</style>

<div class="image-square">
  {#if link.length > 0}
    <a href={link} class="image-container">
      <img src={`${base + filePath}`} alt={altText} />
    </a>
  {:else}
    <div class="image-container">
      <img src={`${base + filePath}`} alt={altText} />
    </div>
  {/if}
</div>