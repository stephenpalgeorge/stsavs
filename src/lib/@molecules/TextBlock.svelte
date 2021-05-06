<script>
  import snarkdown from "snarkdown";
  import ButtonLink from "../@atoms/ButtonLink.svelte";

  export let actions = [];
  export let body = "";
  export let colorTheme = "";
  export let title = "";
  export let pretitle = "";
  export let titleLevel = "h1";

  const blockTitle = `<${titleLevel}>${
    pretitle.length > 0 ? `<span>${pretitle}</span>` : ""
  }${title}</${titleLevel}>`;
</script>

<style>
  .text-block {
    position: relative;
    width: 100%;
    padding: var(--vertical-flow) 0;
  }

  .mask {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
    overflow: hidden;
  }

  .mask::after,
  .mask::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    transform: translate(50%, -40%);
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
  }

  .mask::before {
    width: 24rem;
    height: 24rem;
    transform: translate(40%, 20%);
  }

  .text-block > div:not(.mask) {
    width: 100%;
    max-width: var(--content-width);
    margin: 0 auto;
  }

  :global(.text-block h1 span) {
    font-family: var(--font-family--cursive);
    margin-right: 0.5rem;
  }

  .top-space {
    margin-top: 2rem;
  }

  .actions {
    margin-top: 1.5rem;
    isolation: isolate;
  }

  :global(.theme--purple h1) {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    padding: 0.25rem 1rem;
    background-color: var(--color-light);
  }

  /* theming */
  .theme--purple {
    background-color: var(--color-main);
    color: var(--color-light);
  }

  .theme--purple .mask::before,
  .theme--purple .mask::after {
    background-color: #898aa333;
  }

  .theme--red .mask::before,
  .theme--red .mask::after {
    background-color: #d76e6133;
  }

  .theme--red {
    background-color: var(--color-secondary);
    color: var(--color-light);
  }

  :global(.theme--purple h1) {
    border: 1px solid var(--color-main);
    color: var(--color-main);
  }

  [class*="theme"] * {
    color: inherit;
  }

  :global(.actions a + a) {
    margin-left: 4rem;
  }

  @media screen and (max-width: 767px) {
    .text-block > div {
      width: 90%;
    }
  }
</style>

<section class="text-block theme--{colorTheme}">
  <div class="mask" />
  <div>
    <!-- text content -->
    {@html blockTitle}
    <p class:top-space={titleLevel === 'h1'}>
      {@html snarkdown(body)}
    </p>

    <!-- buttons -->
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
  </div>
</section>
