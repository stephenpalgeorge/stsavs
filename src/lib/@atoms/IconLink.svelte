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

<style>
  .icon-link {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-link img {
    max-width: 60%;
    max-height: 60%;
  }

  .icon-link:hover {
    animation: twist 0.6s;
  }

  :global(.dark-theme--link, .purple-theme--link, .red-theme--link) {
    background-color: var(--color-light);
  }

  :global(.light-theme--link) {
    background-color: var(--color-dark);
  }

  @keyframes twist {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(12deg);
    }
    75% {
      transform: rotate(-6deg);
    }
    100% {
      transform: rotate(0);
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
