<script>
  import snarkdown from "snarkdown";
  import ButtonLink from "../@atoms/ButtonLink.svelte";

  export let actions = [];
  export let body = "";
  export let colorTheme = "";
  export let title = "";
  export let titleLevel = "h1";

  const blockTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<section class="text-block theme--{colorTheme}">
  <!-- text content -->
  {@html blockTitle}
  <p>
    {@html snarkdown(body)}
  </p>
  <!-- buttons -->
  {#each actions as action}
    <!-- print buttons here -->
    <ButtonLink
      label={action.label}
      style={action.style}
      theme={colorTheme}
      url={action.url} />
  {/each}
</section>
