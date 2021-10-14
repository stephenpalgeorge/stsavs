<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import snarkdown from 'snarkdown';
  import ButtonLink from '$atoms/ButtonLink.svelte';
  import Image from '$atoms/Image.svelte';

  export let id = "";
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

  let width;
  if (browser) width = window.innerWidth;
  else width = 0;

  let storyBlockRef;
  onMount(() => {
    const link = document.querySelector(`#story-block--${id} .actions`);
    const options = { threshold: .75 };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          link.style.opacity = "1";
          link.style.transform = "translateX(0)";
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(storyBlockRef);
  });
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  :global {
    .story-block {
      h1, h2, h3, h4, h5, h6 {
        margin-top: var.$vertical-flow;
        margin-bottom: 1.5rem;
        text-transform: uppercase;
      }

      .actions {
        opacity: 0;
        transform: translateX(1rem);
        transition: opacity .5s ease-out, transform .5s ease-out;

        a {
          text-align: center;
        }
      }

      .image-container {
        width: 18rem;
        height: 18rem;

        @include m.layout-break(sm) {
          margin: 0 auto;
          width: 100%;
        }

        .mask--circle {
          display: none;
        }
      }

      @include m.layout-break(sm) {  
        .actions a {
          width: 100%;
        }
      }

      @include m.layout-break(md) {
        blockquote::before {
          left: 0;
          top: -6rem;
        }
      }
    }
  }

  .story-block {
    > div {
      position: relative;
      padding: var.$vertical-flow 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      @include m.layout-container;
      border-bottom: 1px solid rgba(var.$color-dark, .24);
      &::after {
        position: absolute;
        content: "//";
        bottom: 0;
        left: 50%;
        padding: 0 1rem;
        transform: translate(-50%, 50%);
        font-size: var.$font-size--lead;
        color: rgba(var.$color-dark, .24);
        background-color: var.$color-light;
      }
      
      @include m.layout-break(sm) { flex-direction: column; }
      
      > * {
        flex-basis: 50%;
      }
    }

    .text-content {
      position: relative;
      border-top: 1px solid var.$color-dark;

      @include m.layout-break(sm) {
        margin-top: var.$vertical-flow;
      }
      
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

<svelte:window bind:innerWidth={width} />

<section class="story-block {imagePosClass}" id="story-block--{id}" bind:this={storyBlockRef}>
  <div>
    {#if imagePos === 'left' || width < 576}
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

    {#if imagePos === 'right' && width >= 576}
      <Image
        filePath={image.url}
        altText={image.alternative_text}
        filter={imageFilter}
        filterPosition={filterPos} />
    {/if}
  </div>
</section>