<script>
  import snarkdown from 'snarkdown';

  export let title = "";
  export let titleLevel = "h2";
  export let body = "";
  export let videoId = "";

  const videoTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<section class="video-block">
  {#if title && title.length > 0}
    {@html videoTitle}
  {/if}

  {#if body && body.length > 0}
    {@html snarkdown(body)}
  {/if}
</section>