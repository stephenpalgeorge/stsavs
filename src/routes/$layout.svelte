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
  import Navbar from "$lib/Navigation/Navbar.svelte";
  export let menu;
</script>

<style>
  @font-face {
    font-family: "Montserrat";
    src: url("../fonts/Montserrat-Black.ttf") format("truetype");
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: "Montserrat";
    src: url("../fonts/Montserrat-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Museo Slab";
    src: url("../fonts/Museo_Slab_900.ttf") format("truetype");
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: "Museo Slab";
    src: url("../fonts/Museo_Slab_300.ttf") format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Jenna Sue";
    src: url("../fonts/JennaSue.ttf") format("truetype");
  }

  :root {
    /* layout */
    --nav-height: 4rem;
    --content-width: 45rem;
    --vertical-flow: 3rem;
    --horizontal-flow: 2rem;

    /* colours */
    --color-dark: #222;
    --color-light: #fff;
    --color-light--fade: rgba(255, 255, 255, 0.16);
    --color-main: rgba(76, 77, 98);
    --color-main--accent: rgba(220, 210, 0, 1);
    --color-main--accent--fade: rgba(220, 210, 0, 0.16);
    --color-main--fade: rgba(76, 77, 98, 0.1);
    --color-secondary: rgba(205, 73, 56, 1);
    --color-secondary--accent: rgba(115, 208, 220, 1);
    --color-secondary--fade: rgba(205, 73, 56, 0.16);
    --color-secondary--accent--fade: rgba(115, 208, 220, 0.32);

    /* fonts */
    --font-size--headings: 2.5rem;
    --font-size--subheadings: 1.8rem;
    --font-family--sans-serif: "Montserrat", sans-serif;
    --font-family--serif: "Museo Slab", serif;
    --font-family--cursive: "Jenna Sue", cursive;

    /* shadows */
    --shadow-base: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.24);
  }

  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(h1) {
    font-size: var(--font-size--headings);
    font-family: var(--font-family--sans-serif);
    font-weight: 900;
  }

  :global(h2, h3) {
    font-size: var(--font-size--subheadings);
    font-family: var(--font-family--sans-serif);
  }

  :global(p) {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    line-height: 1.75;
  }
</style>

<Navbar {menu} />
<slot />
