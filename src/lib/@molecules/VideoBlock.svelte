<script>
  import snarkdown from 'snarkdown';

  export let title = "";
  export let titleLevel = "h2";
  export let body = "";
  export let videoId = "";

  const videoTitle = `<${titleLevel}>${title}</${titleLevel}>`;
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  .video-block {
    background-color: var.$color-main--fade;
    > div {
      display: flex;
      flex-direction: column;
      padding: var.$vertical-flow 0;
      @include m.layout-container;

      > * + * {
        margin-top: var.$vertical-flow / 2;
      }
    }

    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

  }
  :global {
    .video-block {
      h1, h2, h3, h4, h5, h6 {
        text-transform: uppercase;
      }

      a {
        font-family: var.$font-family--serif;
        font-weight: 800;
        color: var.$color-secondary;
      }
    }
  }
</style>

<section class="video-block">
  <div>
    <div class="video-block__header">
      {#if title && title.length > 0}
        {@html videoTitle}
      {/if}

      {#if body && body.length > 0}
        <p>{@html snarkdown(body)}</p>
      {/if}
    </div>

    <div class="video-wrapper">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  </div>
</section>