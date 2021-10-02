<script>
  import snarkdown from 'snarkdown';
  import ButtonLink from '$atoms/ButtonLink.svelte';
  
  export let title = "";
  export let body = "";
  export let action = {};
  export let colorTheme = "red";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .call-to-action {
    position: relative;
    width: 100%;
    padding: var.$vertical-flow 0;
    
    .mask {
      @include m.layout-mask;
      > div {
        $diameter: 15rem;
        position: absolute;
        @include m.shapes-circle($diameter);
        top: $diameter * -.4;
        left: 50%;
        background-color: rgba(var.$color-light, .2);
      }

      &::before {
        position: absolute;
        content: '';
        width: 50%;
        height: 3rem;
        bottom: 0;
        border: .25rem solid var.$color-light;
        border-right-width: 0;
        border-left-width: 0;
        transform-origin: center;
        transform: translate(-40%, -50%) rotate(45deg);

        @include m.layout-break(md) { display: none; }
      }
    }

    > div:not(.mask) {
      @include m.layout-container;
      display: flex;
      
      .action {
        flex-basis: 25%;
        flex-shrink: 0;
        min-width: 8rem;
        margin-left: 2rem;
      }

      @include m.layout-break(md) {
        flex-direction: column;
        .action {
          margin-left: 0;
          margin-top: 2rem;
        }
      }
    }


    h2 + * {
      margin-top: var.$vertical-flow * .25;
    }

    // theming
    &.theme {
      &--red {
        background-color: var.$color-secondary;
      }
    }
  }

  :global {
    .call-to-action.theme--red {
      h2, p {
        color: var.$color-light;
      }
    }

    .call-to-action {
      .action a {
        isolation: isolate;
        width: 100%;
        text-align: center;
      }
    }
  }

</style>

<section class="call-to-action theme--{colorTheme}">
  <div>
    <div class="mask"><div></div></div>
    <div class="text-content">
      <h2>{title}</h2>
      <p class="body-text">
        {@html snarkdown(body)}
      </p>
    </div>
    <div class="action">
      <ButtonLink label={action.label} url={action.url} style={action.style} theme={colorTheme} />
    </div>
  </div>
</section>