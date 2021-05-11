<script>
  import snarkdown from 'snarkdown';
  import ButtonLink from '$atoms/ButtonLink.svelte';
  import Image from '$atoms/Image.svelte';

  export let title = "";
  export let titleLevel = "h2";
  export let quoteText = "";
  export let quoteSource = "";
  export let body = "";
  export let buttons = [];
  export let image = {};
  export let imagePos = "left";
  export let imageFilter = false;
  export let filterPos = ['50%', '50%'];

  const blockTitle = `<${titleLevel}>${title}</${titleLevel}>`;
  const imagePosClass = `image--${imagePos}`;
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  :global {
    .story-block {
      h1, h2, h3 {
        margin-top: var.$vertical-flow;
        margin-bottom: 1.5rem;
      }

      .image-container {
        width: 18rem;
        height: 18rem;
      }
    }
  }

  .story-block {
    > div {
      padding: var.$vertical-flow 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      @include m.layout-container;

      > * {
        flex-basis: 50%;
      }
    }

    .text-content {
      position: relative;
      border-top: 1px solid var.$color-dark;

      .mask {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        
        &::after {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          width: 100%;
          height: 2rem;
          border: 1px solid var.$color-dark;
          transform-origin: 40%;
          transform: translateX(45%) rotate(45deg);
        }
      }

      blockquote, p {
        margin-bottom: 1.5rem;
      }
    }
  }
</style>

<section class="story-block {imagePosClass}">
  <div>
    {#if imagePos === 'left'}
    <Image
    filePath={image.url}
    altText={image.alternative_text}
    filterPosition={filterPos} />
    {/if}
    
    <div class="text-content">
      <div class="mask"></div>
      {#if title && title.length > 0}
        {@html blockTitle}
      {/if}

      {#if quoteText && quoteText.length > 0}
        <blockquote cite="{quoteSource}">
          {@html snarkdown(quoteText)}
        </blockquote>
      {/if}

      {#if body && body.length > 0}
        <p>{@html snarkdown(body)}</p>
      {/if}

      {#if buttons && buttons.length > 0}
        <div class="actions">
          {#each buttons as button}
            <ButtonLink
              label={button.label}
              style={button.style}
              url={button.url}
              theme="light" />
          {/each}
        </div>
      {/if}
    </div>

    {#if imagePos === 'right'}
      <Image
        filePath={image.url}
        altText={image.alternative_text}
        filter={imageFilter}
        filterPosition={filterPos} />
    {/if}
  </div>
</section>