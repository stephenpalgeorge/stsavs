<script>
  export let tags;
</script>

{#if tags.title}
  <title>{tags.title}</title>
  <meta name="twitter:title" property="og:title" content={tags.title} />
{/if}

{#if tags.description}
  <meta
    name="twitter:description"
    property="og:description"
    content={tags.title} />
  <meta name="description" content={tags.description} />
{/if}
