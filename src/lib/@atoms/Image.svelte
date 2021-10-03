<script>
  import { onMount } from 'svelte';
  import { base } from '$lib/config.js';
  
  export let filePath = "";
  export let altText = "";
  // filter position represents an x and y value for the circle mask.
  export let filterPosition = ['50%', '50%'];
  export let filter = true;
  export let black_white = false;
  export let focalPoint = ['50%', '50%'];

  let mask;
  let imageEl;

  onMount(() => {
    if (mask) {
      mask.style.top = filterPosition[1];
      mask.style.left = filterPosition[0];
    }

    if (imageEl) {
      imageEl.style.objectPosition = `${focalPoint[0]} ${focalPoint[1]}`;
    }
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;

  .image-container {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .filter {
    border: .25rem solid var.$color-light;
    box-shadow: 0 .125rem .5rem 0 rgba(var.$color-dark, .24);
  }

  .desaturate {
    filter: saturate(0);
  }

  .mask--circle {
    @supports (backdrop-filter: grayscale(100%)) {
      position: absolute;
      content: "";
      width: 65%;
      height: 65%;
      top: 50%;
      left: 50%;
      border: .25rem solid var.$color-light;
      border-radius: 50%;
      backdrop-filter: grayscale(100%);
      transform: translate(-50%, -50%);
    }
  }
</style>

<div class="image image-container" class:filter={filter} class:desaturate={black_white}>
  <img src={base + filePath} alt={altText} bind:this={imageEl} />
  {#if filter}
    <div bind:this={mask} class="mask--circle"></div>
  {/if}
</div>