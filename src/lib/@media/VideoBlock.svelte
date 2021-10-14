<script>
  import snarkdown from 'snarkdown';
  import BlockHeader from '$atoms/BlockHeader.svelte';

  export let title = "";
  export let body = "";
  export let videoId = "";
  export let id = "";
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  .video-block {
    background-color: var.$color-main--fade;
    border-top: 1px solid var.$color-alt;
    border-bottom: 1px solid var.$color-alt;
    > div {
      display: flex;
      flex-direction: column;
      padding: var.$vertical-flow 0;
      @include m.layout-container;

      > * + * {
        margin-top: var.$vertical-flow * .5;
      }
    }

    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      border: .25rem solid var.$color-main--fade;
      box-shadow: var.$shadow-base;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

  }
  :global {
    .video-block {
      a {
        font-family: var.$font-family--serif;
        font-weight: 800;
        color: var.$color-secondary;
      }
    }
  }
</style>

<section class="video-block" id="video-block--{id}">
  <div>
    <BlockHeader title={title} description={body} />
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