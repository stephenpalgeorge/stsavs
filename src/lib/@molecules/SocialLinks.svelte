<script>
  import IconLink from "$lib/@atoms/IconLink.svelte";
  export let title = "";
  export let titleLevel = "h2";
  export let links = [];
  export let colorTheme = "dark";

  let linksTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<style>
  :global(.social-links h1, .social-links h2, .social-links h3) {
    text-transform: uppercase;
  }

  :global(.links .icon-link + .icon-link) {
    margin-left: 2rem;
  }

  .social-links {
    padding: 1.25rem 0;
  }

  .social-links > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--content-width);
    margin: 0 auto;
  }

  .links {
    display: flex;
  }

  /* theming */
  .theme--dark {
    background-color: var(--color-dark);
  }

  .theme--purple {
    background-color: var(--color-main);
  }

  .theme--red {
    background-color: var(--color-secondary);
  }

  :global(.theme--dark h1, .theme--dark h2, .theme--dark h3, .theme--purple
      h1, .theme--purple h2, .theme--purple h3, .theme--red h1, .theme--red
      h2, .theme--red h3) {
    color: var(--color-light);
  }

  :global(.theme--light h1, .theme--light h2, .theme--light h3) {
    color: var(--color-dark);
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
