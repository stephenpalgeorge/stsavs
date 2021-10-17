<script>
  import { onMount } from 'svelte';
  import snarkdown from 'snarkdown';
  import BlockHeader from '$atoms/BlockHeader.svelte';
  import Card from '$molecules/Card.svelte';

  export let anchorId = "";
  export let id = "";
  export let title = "";
  export let body = "";
  export let cards = [];

  const uid = anchorId.length > 0 ? anchorId : `card-block--${id}`;
  let cardsRef;
  onMount(() => {
    const threshold = window.innerWidth <= 575 ? .2 : .5;
    const cards = Array.from(document.querySelectorAll(`#${uid} .cards-container .card`));
    const options = { threshold };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
            card.style.transitionDelay = `${i * .2}s`;
          });
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(cardsRef);
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;
  .card-block {
    padding-top: var.$vertical-flow;

    > div {
      @include m.layout-container;
      position: relative;
      border-bottom: 1px solid rgba(var.$color-dark, .24);
      padding-bottom: var.$vertical-flow;
      &::after {
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
    }

    .cards-container {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
      margin-top: var.$vertical-flow;
      margin-bottom: -3.5rem;
      
      @supports not (display: grid) {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        @include m.layout-break(sm) {
          flex-direction: column;
        }
      }
    }
  }

  :global {
    .card-block .cards-container {
      .card {
        margin-bottom: var.$vertical-flow;
        @include m.layout-break(sm) {
          margin-bottom: var.$vertical-flow * .5;
        }
        flex: 1 0 30%;
        opacity: 0;
        transform: translateX(1rem);
        transition: opacity .4s ease-out, transform .4s ease-out;
        @include m.layout-break(sm) {
          max-width: 100% !important;
        }
      }

      > * + * {
        // margin-left: var.$horizontal-flow;
        width: 100%;

        @include m.layout-break(sm) {
          margin-left: 0;
          margin-top: var.$vertical-flow;
        }
      }
    }
  }
</style>

<section class="card-block" id={uid}>
  <div>
    <BlockHeader title={title} description={body} />
    {#if cards.length > 0}
      <div class="cards-container" bind:this={cardsRef}>
        {#each cards as card}
          <Card
            colorTheme={card.color_theme}
            title={card.title}
            heading={card.heading}
            body={card.body}
            buttonLabel={card.link?.label}
            buttonUrl={card.link?.url} buttonStyle={card.link.style} />
        {/each}
      </div>
    {/if}
  </div>
</section>