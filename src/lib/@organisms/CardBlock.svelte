<script>
  import snarkdown from 'snarkdown';
  import BlockHeader from '$atoms/BlockHeader.svelte';
  import Card from '$molecules/Card.svelte';

  export let title = "";
  export let body = "";
  export let cards = [];
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;
  .card-block {
    padding: var.$vertical-flow 0;

    > div {
      @include m.layout-container;
    }

    .cards-container {
      display: flex;
      margin-top: var.$vertical-flow;
      @media screen and (max-width: 767px) {
        flex-direction: column;
      }
    }
  }

  :global {
    .card-block .cards-container {
      .card {
        @media screen and (max-width: 767px) {
          max-width: 100% !important;
        }
      }

      > * + * {
        margin-left: var.$horizontal-flow;
        width: 100%;

        @media screen and (max-width: 767px) {
          margin-left: 0;
          margin-top: var.$vertical-flow;
        }
      }
    }
  }
</style>

<section class="card-block">
  <div>
    <BlockHeader title={title} description={body} />
    {#if cards.length > 0}
      <div class="cards-container">
        {#each cards as card}
          <Card
            colorTheme={card.color_theme}
            title={card.title}
            heading={card.heading}
            body={card.body}
            buttonLabel={card.link.label}
            buttonUrl={card.link.url} buttonStyle={card.link.style} />
        {/each}
      </div>
    {/if}
  </div>
</section>