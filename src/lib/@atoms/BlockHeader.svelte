<script>
  import snarkdown from 'snarkdown';

  export let title = "";
  export let description = "";
</script>

<style lang="scss">
  @use '../scss/variables' as var;

  .block-header {
    margin-bottom: var.$vertical-flow * .5;
    h2 {
      text-transform: uppercase;
    }
    p {
      margin-top: var.$vertical-flow * .25;
    }
  }

  :global {
    .block-header a {
      color: var.$color-secondary;
    }
  }
</style>

{#if title.length > 0 || description.length > 0}
  <div class="block-header">
    {#if title.length > 0}
      <h2>{ title }</h2>
    {/if}

    {#if description.length > 0}
      <p>{ @html snarkdown(description) }</p>
    {/if}
  </div>
{/if}