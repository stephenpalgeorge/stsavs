<script>
  import snarkdown from 'snarkdown';
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

    .header p {
      margin-top: var.$vertical-flow * .25;
    }

    .cards-container {
      display: flex;
      margin-top: var.$vertical-flow;
    }
  }

  :global {
    .card-block .cards-container > * + * {
      margin-left: var.$horizontal-flow;
      width: 100%;
    }
  }
</style>

<section class="card-block">
  <div>
    <div class="header">
      {#if title.length > 0}
        <h2>{title}</h2>
      {/if}

      {#if body.length > 0}
        <p>{@html snarkdown(body)}</p>
      {/if}
    </div>
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