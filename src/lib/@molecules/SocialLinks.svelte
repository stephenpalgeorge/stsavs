<script>
  import { onMount } from 'svelte';
  import IconLink from "$atoms/IconLink.svelte";

  export let anchorId = "";
  export let id = "";
  export let title = "";
  export let titleLevel = "h2";
  export let links = [];
  export let colorTheme = "dark";

  let uid = anchorId.length > 0 ? anchorId : `social-links--${id}`;
  let linksTitle = `<${titleLevel}>${title}</${titleLevel}>`;

  let linksRef;
  onMount(() => {
    const links = Array.from(document.querySelectorAll(`#${uid} .links a`));
    const options = { threshold: .5 };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach((link, i) => {
            link.style.opacity = "1";
            link.style.transitionDelay = `${(links.length * .2) - (i * .2)}s`;
          });
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(linksRef);
  });
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  :global {
    .social-links h1, .social-links h2, .social-links h3 {
      text-transform: uppercase;
      @include m.layout-break(sm) { margin-bottom: var.$vertical-flow * .25; }
    }

    .social-links .links .icon-link {
      opacity: 0;
      transition: opacity .3s ease-out;
    }

    .social-links .links .icon-link + .icon-link {
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

<section class="social-links theme--{colorTheme}" id={uid}>
  <div>
    <!-- title -->
    {#if title && title.length > 0}
      {@html linksTitle}
    {/if}

    <!-- links -->
    {#if links && links.length > 0}
      <div class="links" bind:this={linksRef}>
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
