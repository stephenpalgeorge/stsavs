<script>
  import BlockHeader from '$atoms/BlockHeader.svelte';
  import { base } from '../config.js';

  export let title = "";
  export let description = "";
  export let images = [];
  export let anchorId = "";
  export let id = "";

  const uid = anchorId.length > 0 ? anchorId : `photo-gallery--${id}`;

  // gallery indices
  let current = 0;
  // if `current` is first image, then `previous` should be the last item in the array:
  $: previous = current === 0 ? images.length - 1 : current - 1;
  // if `current` is the last image, then `next` should be the first image in the array:
  $: next = current === images.length - 1 ? 0 : current + 1;

  function setTarget(className) {
    const imgs = Array.from(document.querySelectorAll('.photo-gallery img'));
    imgs.forEach(im => {
      im.classList.remove('target');
      if (im.classList.contains(className)) im.classList.add('target');
    });
  }
  // gallery handlers
  function goNext() {
    setTarget('next');
    if (current === images.length - 1) current = 0;
    else current++;
    
  }

  function goPrevious() {
    setTarget('previous');
    if (current === 0) current = images.length - 1;
    else current--;
  }

  function handleClick(e) {
    console.log(e);
    if (e.target.classList.contains('next')) goNext();
    if (e.target.classList.contains('previous')) goPrevious();
  }
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  .photo-gallery {
    padding: var.$vertical-flow 0;
    > div {
      @include m.layout-container;
    }

    .images-controls {
      padding-bottom: var.$vertical-flow;
      display: flex;
      justify-content: center;

      button {
        position: relative;
        padding: var.$vertical-flow * .25 var.$horizontal-flow * .25;
        background: none;
        border: none;
        margin-inline: 2rem;
        font-family: var.$font-family--sans-serif;
        font-size: var.$font-size--lead;
        font-weight: 100;
        color: var.$color-secondary;
        &:hover {
          text-decoration: underline;
          text-underline-offset: .25em;
        }
        cursor: pointer;

        &#previous span, &#next span {
          position: absolute;
          top: 50%;
          height: 1.5rem;
          width: 1.5rem;
          border: .125rem solid var.$color-secondary;
          border-top-width: 0;
          border-right-width: 0;
          transform-origin: center;
          &::after {
            content: "";
            position: absolute;
            bottom: -.5rem;
            left: 0;
            width: 100%;
            border-bottom: .125rem solid var.$color-secondary;
          }
        }

        &#previous span {
          right: 100%;
          transform: translateY(-50%) rotate(45deg);
        }

        &#next span {
          left: 100%;
          transform: translateY(-50%) rotate(225deg);
        }
      }
    }

    .images-container {
      $transition-length: .4s;
      position: relative;
      // this height represents the ratio of 16:9 when the container is 720px.
      height: 25.3125rem;
      @include m.layout-break(sm) {
        height: 70vw;
      }
      img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        opacity: 0;
        border: .25rem solid var.$color-light;
        box-shadow: var.$shadow-base;
        z-index: -1;
        
        &.current {
          transition: all $transition-length ease-out;
        }
        
        &.current {
          opacity: 1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 75% !important;
          box-shadow: 0 0 1rem .5rem rgba(0, 0, 0, .24);
          z-index: 2;
          @include m.layout-break(sm) {
            top: initial;
            left: initial;
            transform: none;
            max-width: 100% !important;
          }
          @include m.layout-break(md) {
            max-width: 80%;
          }
        }
        
        @media screen and (min-width: 768px) {
          &.previous {
            top: 0;
            left: 0;
            transform: translate(10%, -20%);
          }
          
          &.next {
            top: initial;
            bottom: 0;
            left: initial;
            right: 0;
            transform: translate(-10%, 20%);
          }
          &.previous, &.next {
            opacity: 1;
            max-width: 20%;
            transition: opacity $transition-length ease-out;
            transition-delay: $transition-length * .66;
            z-index: 1;
            cursor: pointer;
          }
        }
        @media screen and (min-width: 992px) {
          &.previous {
            transform: translate(-20%, -20%);
          }
          &.next {
            transform: translate(20%, 20%);
          }

          &.previous, &.next {
            max-width: 35%;
          }
        }
      }
    }
  }
</style>

<section class="photo-gallery" id=uid>
  <div>
    <BlockHeader {title} {description} />
    <div class="images-controls">
      <button id="previous" on:click={goPrevious}><span></span>Previous</button>
      <button id="next" on:click={goNext}>Next<span></span></button>
    </div>
    <div class="images-container">
      {#each images as image, index}
        <img
          src={base + image.url}
          alt={image.alternativeText}
          class:previous={index === previous}
          class:current={index === current}
          class:next={index === next}
          on:click={handleClick} />
      {/each}
    </div>
  </div>
</section>