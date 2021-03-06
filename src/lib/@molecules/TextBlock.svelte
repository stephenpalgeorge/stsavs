<script>
  import { onMount } from 'svelte';
  import snarkdown from "snarkdown";
  import ButtonLink from "$atoms/ButtonLink.svelte";

  export let anchorId = "";
  export let id = "";
  export let actions = [];
  export let body = "";
  export let colorTheme = "purple";
  export let title = "";
  export let pretitle = "";
  export let titleLevel = "h1";

  const uid = anchorId.length > 0 ? anchorId : `text-block--${id}`;
  const blockTitle = `<${titleLevel}>${
    pretitle.length > 0 ? `<span>${pretitle}</span>` : ""
  }${title}</${titleLevel}>`;

  
  let actionsRef;
  onMount(() => {
    const buttons = Array.from(document.querySelectorAll(`#${uid} .actions a`));
    const options = { threshold: .25 };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buttons.forEach((button, i) => {
            button.style.transitionDelay = `${i * .25}s`;
            button.style.opacity = "1";
          });
        }
      });
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(actionsRef);
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .text-block {
    position: relative;
    width: 100%;
    padding: var.$vertical-flow 0;

    > div:not(.mask) {
      @include m.layout-container;
      @include m.layout-break(sm) {
        position: relative;
      }
    }

    h1, h2, h3 {
      position: relative;
    }
  }

  .mask {
    @include m.layout-mask;
    &::after,
    &::before {
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      transform: translate(50%, -40%);
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }
    &::before {
      width: 24rem;
      height: 24rem;
      transform: translate(40%, 20%);
    }
  }

  :global {
    .text-block h1 span,
    .text-block h2 span,
    .text-block h3 span {
      font-family: var.$font-family--cursive;
      position: absolute;
      transform: translateY(-100%);
      text-shadow: 0 0 .25rem var.$color-light;
    }

    .text-block.theme {
      &--purple h1 {
        color: var.$color-light;
      }
      
      &--red h1 {
        color: var.$color-light;
      }
    }

    .text-block .actions a {
      opacity: 0;
      transition: opacity .5s ease;
      @include m.layout-break(sm) {
        text-align: center;
      }

      + a {
        margin-left: 4rem;

        @include m.layout-break(sm) {
          margin-left: 0;
          margin-top: 2rem;
        }
      }
    }
  }

  .top-space {
    margin-top: 2rem;
  }

  .actions {
    isolation: isolate;
    p + & {
      margin-top: 1.5rem;
    }

    @include m.layout-break(sm) {
      display: flex;
      flex-direction: column;
    }
  }

  /* theming */
  .theme {
    &--purple {
      background-color: var.$color-main;
      color: var.$color-light;
  
      .mask::before, .mask::after {
        background-color: #898aa333;
      }
    }
  
    &--red {
      background-color: var.$color-secondary;
      color: var.$color-light;
    
      .mask::before, .mask::after {
        background-color: #d76e6133;
      }
    }

    &--light {
      background-color: var.$color-light;
      color: var.$color-dark;

      .mask::before, .mask::after {
        background-color: rgba(var.$color-main, .06);
      }
    }
  }

  [class*="theme"] * {
    color: inherit;
  }
</style>

<section class="text-block theme--{colorTheme}" id={uid}>
  <div class="mask" />
  <div>
    <!-- text content -->
    {#if title && title.length > 0}
      {@html blockTitle}
    {/if}

    {#if body && body.length > 0}
      <p class:top-space={['h1', 'h2', 'h3'].includes(titleLevel)}>
        {@html snarkdown(body)}
      </p>
    {/if}

    <!-- buttons -->
    {#if actions && actions.length > 0}
      <div class="actions" bind:this={actionsRef}>
        {#each actions as action}
          <!-- print buttons here -->
          <ButtonLink
            label={action.label}
            style={action.style}
            theme={colorTheme}
            url={action.url} />
        {/each}
      </div>
    {/if}
  </div>
</section>
