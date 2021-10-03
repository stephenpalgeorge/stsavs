<script>
  import snarkdown from 'snarkdown';
  import ButtonLink from '$atoms/ButtonLink.svelte';

  export let title = "";
  export let heading = "";
  export let body = "";
  export let buttonLabel = "";
  export let buttonUrl = "";
  export let buttonStyle = "outline";
  export let colorTheme = "purple";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;
  
  .card {
    position: relative;
    max-width: 14rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid;
    border-bottom: none;
    border-left: none;

    .mask {
      @include m.layout-mask;
      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        right: 0;
        width: 100%;
        height: 1rem;
        border: 1px solid;
        transform: translate(50%, -100%) rotate(-45deg);
      }
    }

    &-content {
      padding-top: var.$vertical-flow * .75;
      padding-right: var.$horizontal-flow * .5;
      margin-bottom: var.$vertical-flow * .25;
      > * + * {
        margin-top: var.$vertical-flow * .125;
      }
    }

    h3 {
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(-50%);
      padding: var.$vertical-flow * .125 var.$vertical-flow * .25;
      font-size: var.$font-size--lead;
      font-weight: 900;
      font-family: var.$font-family--serif;
      width: max-content;
    }

    h4 {
      font-family: var.$font-family--sans-serif;
      text-transform: uppercase;
      font-weight: 900;
      font-size: var.$font-size--base;
    }

    &.theme--purple {
      border-color: var.$color-main;
      h3 {
        color: var.$color-light;
        background-color: var.$color-main;
      }
    }

    &.theme--red {
      border-color: var.$color-secondary;
      h3 {
        color: var.$color-light;
        background-color: var.$color-secondary;
      }
    }

    &.theme--dark {
      border-color: var.$color-dark;
      h3 {
        color: var.$color-light;
        background-color: var.$color-dark;
      }
    }
  }

  :global {
    .card.theme--purple .mask::after {
      border-color: var.$color-main !important;
    }
    .card.theme--red .mask::after {
      border-color: var.$color-secondary !important;
    }
    .card.theme--dark .mask::after {
      border-color: var.$color-dark !important;
    }

    .card a {
      margin-top: auto;

      @mixin theme($bg, $accent, $pseudo) {
        color: $accent;
        border: .125rem solid $accent;
        background-color: $bg;
        &::after, &::before {
          background-color: $pseudo;
        }
      }

      &.purple-theme--outline {
        @include theme(var.$color-light, var.$color-main, var.$color-main--fade);
      }

      &.red-theme--outline {
        @include theme(var.$color-light, var.$color-secondary, var.$color-secondary--fade);
      }

      &.dark-theme--outline {
        @include theme(var.$color-light, var.$color-dark, var.$color-dark--fade);
      }
    }
  }
</style>

<div class="card theme--{colorTheme}">
  <div class="mask"></div>
  {#if title.length > 0}<h3>{title}</h3>{/if}
  {#if heading.length > 0 || body.length > 0}
    <div class="card-content">
      {#if heading.length > 0}<h4>{heading}</h4>{/if}
      {#if body.length > 0}<p>{@html snarkdown(body)}</p>{/if}
    </div>
  {/if}
  {#if buttonUrl.length > 0}
    <ButtonLink label={buttonLabel} url={buttonUrl} theme={colorTheme} style={buttonStyle} />
  {/if}
</div>