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
  import Navbar from "../components/Navbar.svelte";
  export let menu;
</script>

<Navbar {menu} />
<slot />
