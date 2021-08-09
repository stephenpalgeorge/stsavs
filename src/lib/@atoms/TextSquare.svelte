<script>
  export let color = "";
  export let text = "";
  export let link = "";
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .text-square {
    position: relative;
    width: var.$banner-square-side;
    padding-bottom: var.$banner-square-side;
    height: 0;

    .text-container {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 1rem;

      display: flex;
      justify-content: center;
      align-items: center;

      > * {
        text-transform: uppercase;
        font-weight: 900;
        font-size: var.$font-size--lead;
        line-height: 1.2;
        text-align: center;
      }

      // theming:
      &--purple {
        background-color: var.$color-main;
        color: var.$color-light;
      }
      &--red {
        background-color: var.$color-secondary;
        color: var.$color-light;
      }
      &--dark {
        background-color: var.$color-dark;
        color: var.$color-light;
      }
      &--light {
        background-color: var.$color-light;
        color: var.$color-dark;
      }
    }
  }
</style>

<div class="text-square">
  {#if link.length > 0}
    <a href={link} class="text-container text-container--{color}">
      <p>{text}</p>
    </a>
    {:else}
    <div class="text-container text-container--{color}">
      <p>{text}</p>
    </div>
  {/if}
</div>