<script>
  import TextBlock from "../@molecules/TextBlock.svelte";
  export let components = [];
</script>

{#if components.length > 0}
  {#each components as component}
    {#if component.__component === 'molecules.text-block'}
      <TextBlock
        actions={component.actions}
        body={component.body}
        colorTheme={component.color_theme}
        title={component.title}
        titleLevel={component.title_level} />
    {/if}
  {/each}
{/if}
