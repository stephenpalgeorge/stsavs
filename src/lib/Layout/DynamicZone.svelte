<script>
  import SocialLinks from "$lib/@molecules/SocialLinks.svelte";
  import TextBlock from "$lib/@molecules/TextBlock.svelte";
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
        pretitle={component.pre_title}
        titleLevel={component.title_level} />
    {/if}

    {#if component.__component === 'molecules.social-links'}
      <SocialLinks
        title={component.title}
        titleLevel={component.title_level}
        links={component.Icons}
        colorTheme={component.color_theme} />
    {/if}
  {/each}
{/if}
