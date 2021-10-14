<script>
  import snarkdown from 'snarkdown';
  import { base } from '$lib/config.js';

  export let filePath = "";
  export let altText = "";
  export let heading = "";
  export let caption = "";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .image-caption {
    img {
      max-width: 14rem;
      border: .125rem solid var.$color-light;
      border-radius: .125rem;
      box-shadow: var.$shadow-base;
    }

    figcaption {
      margin-top: var.$vertical-flow * .25;

      h3 {
        font-family: var.$font-family--serif;
        font-weight: 900;
        font-size: 1.4rem;
      }
    }

    @include m.layout-break(sm) {
      display: flex;
      
      img {
        max-width: 48%;
        margin-right: var.$horizontal-flow * .5;
      }

      figcaption {
        width: 100%;
        margin-top: 0;
        padding-top: var.$vertical-flow * .25;
      }
    }
  }
</style>

<figure class="image-caption">
  <img src={base + filePath} alt={altText} />
  {#if heading.length > 0 || caption.length > 0}
    <figcaption>
      <h3>{heading}</h3>
      <p>{@html snarkdown(caption)}</p>
    </figcaption>
  {/if}
</figure>
