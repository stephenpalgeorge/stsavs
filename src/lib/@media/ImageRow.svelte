<script>
  import { onMount } from 'svelte';
  import BlockHeader from '$atoms/BlockHeader.svelte';
  import ImageCaption from '$atoms/ImageCaption.svelte';

  export let anchorId = "";
  export let id = "";
  export let title = "";
  export let description = "";
  export let images = [];
  export let colorTheme = "purple";

  let uid = anchorId.length > 0 ? anchorId : `image-row--${id}`;

  let imageRowRef;
  onMount(() => {
    const imageArray = Array.from(document.querySelectorAll(`#${uid} .images img`));
    const options = { threshold: .4 };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imageArray.forEach((im, i) => {
            im.style.transitionDelay = `${i * .2}s`;
            im.style.transform = "translateX(0)";
            im.style.opacity = "1";
          });
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imageRowRef);
  });
</script>

<style lang="scss">
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;
  
  .image-row {
    position: relative;
    border-bottom: 1px solid var.$color-alt;
    border-top: 1px solid var.$color-alt;
    padding: var.$vertical-flow 0;

    .mask {
      @include m.layout-mask;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 10rem;
        height: 2rem;
        border: .125rem solid var.$color-alt;
        transform-origin: center;
        transform: rotate(45deg) translate(25%, -80%);
      }
    }

    > div:not(.mask) {
      @include m.layout-container;
    }

    .images {
      list-style-type: none;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      margin: -(var.$vertical-flow * .5) 0;
      li {
        margin-top: var.$vertical-flow * .5;
      }
    }
  }
  
  .image-row.color-theme {
    &--purple {
      background-color: var.$color-main--fade;
    }

    &--red {
      background-color: var.$color-secondary--fade;
    }

    &--light {
      background-color: var.$color-light;
    }
  }

  :global {
    .image-row .images img {
      opacity: 0;
      transform: translateX(-1rem);
      transition: opacity .4s ease-out, transform .4s ease-out;
    }
  }
</style>

<section class="image-row color-theme--{colorTheme}" id={uid} bind:this={imageRowRef}>
  <div class="mask"></div>
  <div>
    {#if title.length > 0 || description.length > 0}
      <BlockHeader {title} {description} />
    {/if}

    <ul class="images">
      {#each images as image}
        <li class="images--image-caption">
          <ImageCaption
            filePath={image.image.url}
            altText={image.image.alternativeText}
            heading={image.heading}
            caption={image.description} />
        </li>
      {/each}
    </ul>
  </div>
</section>
