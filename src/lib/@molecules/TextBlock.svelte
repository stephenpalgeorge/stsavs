<script>
  import snarkdown from "snarkdown";
  import ButtonLink from "$atoms/ButtonLink.svelte";

  export let actions = [];
  export let body = "";
  export let colorTheme = "purple";
  export let title = "";
  export let pretitle = "";
  export let titleLevel = "h1";

  const blockTitle = `<${titleLevel}>${
    pretitle.length > 0 ? `<span>${pretitle}</span>` : ""
  }${title}</${titleLevel}>`;
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
    .text-block h1 span {
      font-family: var.$font-family--cursive;
      margin-right: 0.5rem;
    }

    .text-block h1 {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      padding: 0.25rem 1rem;
      background-color: var.$color-light;
    }

    .theme {
      &--purple h1 {
        border: 1px solid var.$color-main;
        color: var.$color-main;
      }
      
      &--red h1 {
        border: 1px solid var.$color-secondary;
        color: var.$color-secondary;
      }
    }


    .actions a + a {
      margin-left: 4rem;
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
  }

  [class*="theme"] * {
    color: inherit;
  }
</style>

<section class="text-block theme--{colorTheme}">
  <div class="mask" />
  <div>
    <!-- text content -->
    {#if title && title.length > 0}
      {@html blockTitle}
    {/if}

    {#if body && body.length > 0}
      <p class:top-space={titleLevel === 'h1'}>
        {@html snarkdown(body)}
      </p>
    {/if}

    <!-- buttons -->
    {#if actions && actions.length > 0}
      <div class="actions">
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
