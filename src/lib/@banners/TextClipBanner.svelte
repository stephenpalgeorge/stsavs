<script>
  import { onMount } from 'svelte';
  import ButtonLink from '$atoms/ButtonLink.svelte';
  import { base } from "$lib/config.js";

  export let title = "";
  export let image = {};
  export let buttons = [];

  let bannerRef;
  onMount(() => {
    const btns = Array.from(document.querySelectorAll('.text-clip-banner a'));
    if (btns.length > 0) {
      const options = { threshold: .8 };
      const callback = (entries, observer) => {
        entries.forEach(entry => {
          btns.forEach((btn, i) => {
            btn.style.opacity = '1';
            btn.style.transitionDelay = `${i * .3}s`;
          });
        });
      }

      const observer = new IntersectionObserver(callback, options);
      observer.observe(bannerRef);
    }
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  
  .text-clip-banner {
    padding: var.$vertical-flow 0;
    > div {
      @include m.layout-container;
      @include m.layout-break(lg) {
        max-width: 45rem;
      }
    }

    h1 {
      text-transform: uppercase;
      letter-spacing: -.25rem;
      text-stroke: .125rem black;
      -webkit-text-stroke: .125rem var.$color-main;
      line-height: .8;
      font-size: 12rem;
      word-wrap: break-word;
      background-clip: text;
      -webkit-background-clip: text;
      background-size: cover;
      color: transparent;
      @include m.layout-break(sm) {
        font-size: 6rem;
      }
    }

    .buttons {
      margin-top: var.$vertical-flow;
    }
  }

  :global {
    .text-clip-banner .buttons a {
      opacity: 0;
      transition: opacity .4s ease-out;
      padding: 1rem 1.5rem;
      + a {
        margin-left: 2rem;
      }

      @include m.layout-break(sm) {
        width: 100%;
        text-align: center;
        + a {
          margin-left: 0;
          margin-top: var.$vertical-flow * .5;
        }
      }

    }
  }
</style>

<section bind:this={bannerRef} class="text-clip-banner">
  <div>
    <h1 style="background-image: url({base + image.url});">{title}</h1>
    
    {#if buttons.length > 0}
      <div class="buttons">
        {#each buttons as button}
          <ButtonLink label={button.label} url={button.url} style={button.style} theme="light" />
        {/each}
      </div>
    {/if}
  </div>
</section>