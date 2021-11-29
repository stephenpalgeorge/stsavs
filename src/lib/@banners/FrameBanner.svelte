<script>
  import ButtonLink from '$atoms/ButtonLink.svelte';
  import Image from '$atoms/Image.svelte';

  export let id = "";
  export let title = "";
  export let buttons = [];
  export let image = {};
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .frame-banner {
    padding: var.$vertical-flow 0;
    @include m.layout-break(md) {
      padding: 0;
    }
    
    > div {
      @include m.layout-container;
      position: relative;
      border: .25rem solid #fff;
      box-shadow: var.$shadow-base;

      @include m.layout-break(md) {
        max-width: 100%;
        border: none;
        box-shadow: none;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        z-index: 1;
        background: linear-gradient(to right, black 0%, rgba(var.$color-dark, 0) 60%);
      }

      .banner-content {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        height: 100%;
        padding: var.$vertical-flow * .5 var.$horizontal-flow;

        display: flex;
        flex-direction: column;
        .buttons-container {
          margin-top: auto;
        }

        h1 {
          max-width: 10ch;
          text-transform: uppercase;
          text-shadow: .125rem .125rem 1px rgba(var.$color-dark, .5);
          color: var.$color-light;
        }
      }
    }
  }

  :global {
    .frame-banner a + a {
      margin-left: 2rem;
    }

    .frame-banner a.light-theme--fill {
      background-color: var.$color-light !important;
      color: var.$color-main !important;
      border: .125rem solid var.$color-main;
      &::before, &::after {
        background-color: rgba(var.$color-light, .48);
      }
    }

    // .frame-banner .image-container {
    //   width: 100%;
    //   height: 100%;
    // }
  }
</style>

<section class="frame-banner" role="banner" id="frame-banner--{id}">
  <div>
    {#if title.length > 0 || buttons.length > 0}
      <div class="overlay"></div>
      <div class="banner-content">
        {#if title.length > 0}
          <h1>{title}</h1>
        {/if}
    
        {#if buttons.length > 0}
          <div class="buttons-container">
            {#each buttons as button}
              <ButtonLink
                label={button.label}
                style={button.style}
                theme="light"
                url={button.url} />
            {/each}
          </div>
        {/if}
      </div>
    {/if}
    
    <Image filePath={image.url} altText={image.alternativeText} filter={false} />
  </div>
</section>