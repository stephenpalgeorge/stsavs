<script context="module">
  export async function load() {
    const url = "http://localhost:1337/menus/6087f2b0e98743662275e912";
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          menu: await res.json()
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }

</script>

<script>
  import { browser } from '$app/env';
  import Navbar from "$lib/Navigation/Navbar.svelte";
  import NavPanel from '$lib/Navigation/NavPanel.svelte';
  import Footer from '$lib/Layout/Footer.svelte';
  export let menu;
  
  let width;
  if (browser) width = window.innerWidth;
  else width = 0;
</script>

<style lang="scss">
  @use '../lib/scss/elements' as el;
  @use '../lib/scss/variables' as var;

  :global {
    #svelte {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    ::selection {
      background-color: rgba(76, 77, 98, 0.99);
      color: var.$color-main--accent;
    }

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    h1 {
      font-size: var.$font-size--headings;
      font-family: var.$font-family--sans-serif;
      font-weight: 900;
    }

    h2, h3 {
      font-size: var.$font-size--subheadings;
      font-family: var.$font-family--sans-serif;
      font-weight: 900;
    }

    h3 {
      font-weight: 400;
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      line-height: 1.75;
    }

    blockquote {
      @include el.blockquote;
    }
  }
</style>

<svelte:window bind:innerWidth={width} />

{#if width > 767}
  <Navbar {menu} />
{:else}
  <NavPanel {menu} />
{/if}
<slot />
<Footer />