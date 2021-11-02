<script>
  import Image from '$atoms/Image.svelte';

  export let title = "";
  export let id = "";
  export let image = "";
  export let focalPoint = ['50%', '50%'];
  export let imageBW = true;
  export let colorTheme = "";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .hero-banner {
    position: relative;

    .mask {
      display: none;
    }
    
    div.background {
      height: 80vh;
      max-height: 40rem;

      @include m.layout-break(sm) {
        max-height: 18rem;
      }
    }

    div.content {
      @include m.layout-container;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      z-index: 1;

      h1 {
        position: relative;
        width: max-content;
        padding: var.$vertical-flow * .25 var.$horizontal-flow * .75;
        transform: translateY(50%);
        border: .125rem solid var.$color-light;
        box-shadow: var.$shadow-base;
        background-color: var.$color-dark;
        color: var.$color-light;
        text-transform: uppercase;
      }

      @include m.layout-break(sm) {
        position: relative;
        left: 0;
        transform: translate(0);
        padding: var.$vertical-flow * .5 0;
        margin-top: var.$vertical-flow * .25;
        margin-bottom: var.$vertical-flow * .25;
        border: 1px solid rgba(var.$color-dark, .24);
        border-left-width: 0;
        border-right-width: 0;
        &::after, &::before {
          position: absolute;
          content: "//";
          bottom: 0;
          left: 50%;
          padding: 0 1rem;
          transform: translate(-50%, 50%);
          font-size: var.$font-size--lead;
          color: rgba(var.$color-dark, .24);
          background-color: var.$color-light;
        }

        &::before {
          bottom: unset;
          top: 0;
          transform: translate(-50%, -50%);
        }

        h1 {
          width: initial;
          background: none;
          border: none;
          box-shadow: none;
          color: var.$color-dark;
          padding: 0;
          transform: translate(0);
        }
      }
    }

    @media screen and (min-width: 1599px) {
      .mask {
        @include m.layout-mask;
        display: block;
        background: linear-gradient(
          to right,
          rgba(var.$color-main, 1),
          rgba(var.$color-main, 1) 15%,
          rgba(var.$color-main, 0) 50%,
          rgba(var.$color-main, 1) 85%,
          rgba(var.$color-main, 1) 100%
        );
      }
    }
  }

  :global {
    .hero-banner {
      &.theme--purple h1 {
        background-color: var.$color-main !important;
        @include m.layout-break(sm) {
          background: none !important;
          color: var.$color-main !important;
        }
      }
      
      &.theme--red h1 {
        background-color: var.$color-secondary !important;
        @include m.layout-break(sm) {
          background: none !important;
          color: var.$color-secondary !important;
        }
      }
      
      &.theme--light h1 {
        background-color: var.$color-light !important;
        color: var.$color-dark !important;
        @include m.layout-break(sm) {
          background: none !important;
          color: var.$color-light !important;
        }
      }
      
      .image-container {
        width: 100%;
        height: 100%;
        @media screen and (min-width: 1599px) {
          max-width: 75%;
          margin: 0 auto;
        }
      }
    }
  }
</style>

<section class="hero-banner theme--{colorTheme}" role="banner" id="hero-banner--{id}">
  <div class="background">
    <Image
      filePath={image.url}
      altText={image.alternative_text}
      filter={false}
      focalPoint={focalPoint}
      black_white={imageBW} />
  </div>
  {#if title.length > 0}
    <div class="content">
      <h1>{title}</h1>
    </div>
  {/if}
  <div class="mask"></div>
</section>
