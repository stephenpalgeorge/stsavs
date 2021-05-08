<script>
  import { base } from "$lib/config.js";
  export let url = "";
  export let altText = "";
  export let filePath = "";
  export let colorTheme = "dark";

  let external = false;
  let linkStyleClass = `${colorTheme}-theme--link`;
  let imgSrc = `${base + filePath}`;

  if (/https:\/\//.test(url)) external = true;
</script>

<style lang="scss">
  @use '../scss/animations' as animate;
  @use '../scss/variables' as var;

  .icon-link {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      animation: animate.$twist;
    }

    img {
      max-width: 60%;
      max-height: 60%;
    }
  }

  :global {
    .dark-theme--link, .purple-theme--link, .red-theme--link {
      background-color: var.$color-light;
    }

    .light-theme--link {
      background-color: var.$color-dark;
    }
  }
</style>

<a
  class="icon-link {linkStyleClass}"
  href={url}
  rel={external ? 'external' : null}
  target={external ? '_blank' : '_self'}>
  <img src={imgSrc} alt={altText} />
</a>
