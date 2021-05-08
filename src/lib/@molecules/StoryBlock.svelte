<script>
  import snarkdown from 'snarkdown';
  import ButtonLink from 'ButtonLink.svelte';

  export let title = "";
  export let titleLevel = "h2";
  export let quoteText = "";
  export let quoteSource = "";
  export let body = "";
  export let buttons = [];
  export let filePath = "";
  export let altText = "";
  export let imagePos = "left";

  const blockTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<section class="story-block">
  {#if imagePos === 'left'}
    <div class="image-content">
      <img src={filePath} alt={altText} />
    </div>
  {/if}

  <div class="text-content">
    {#if title && title.length > 0}
      {@html blockTitle}
    {/if}

    {#if quoteText && quoteText.length > 0}
      <blockquote cite="{quoteSource}">
        {@html snarkdown(quoteText)}
      </blockquote>
    {/if}

    {#if body && body.length > 0}
      <p>{@html snarkdown(body)}</p>
    {/if}

    {#if buttons && buttons.length > 0}
      <div class="actions">
        {#each buttons as button}
          <ButtonLink
            label={button.label}
            style={button.style}
            url={button.url}
            theme="light" />
        {/each}
      </div>
    {/if}
  </div>

  {#if imagePos === 'right'}
    <div class="image-content">
      <img src={filePath} alt={altText} />
    </div>
  {/if}
</section>