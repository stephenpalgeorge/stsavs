<script>
  import IconLink from "$atoms/IconLink.svelte";
  export let title = "";
  export let titleLevel = "h2";
  export let links = [];
  export let colorTheme = "dark";

  let linksTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  :global {
    .social-links h1, .social-links h2, .social-links h3 {
      text-transform: uppercase;
      @include m.layout-break(sm) { margin-bottom: var.$vertical-flow * .25; }
    }

    .links .icon-link + .icon-link {
      margin-left: 2rem;
    }

    .social-links.theme--dark h1, .social-links.theme--dark h2, .social-links.theme--dark h3,
    .social-links.theme--purple h1, .social-links.theme--purple h2, .social-links.theme--purple h3,
    .social-links.theme--red h1, .social-links.theme--red h2, .social-links.theme--red h3 {
      color: var.$color-light;
    }

    .social-links.theme--light h1, .social-links.theme--light h2, .social-links.theme--light h3 {
      color: var.$color-dark;
    }
  }

  .social-links {
    padding: 1.25rem 0;
    
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include m.layout-container;

      @include m.layout-break(sm) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .links {
    display: flex;
  }

  /* theming */
  .theme {
    &--dark { background-color: var.$color-dark; }
    &--purple { background-color: var.$color-main; }
    &--red { background-color: var.$color-secondary; }
  }
</style>

<section class="social-links theme--{colorTheme}">
  <div>
    <!-- title -->
    {#if title && title.length > 0}
      {@html linksTitle}
    {/if}

    <!-- links -->
    {#if links && links.length > 0}
      <div class="links">
        {#each links as link}
          <IconLink
            url={link.url}
            altText={link.icon.alternativeText}
            filePath={link.icon.url}
            {colorTheme} />
        {/each}
      </div>
    {/if}
  </div>
</section>
