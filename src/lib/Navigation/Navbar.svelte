<script>
  import Dropdown from "./Dropdown.svelte";
  import {
    activeNavItem,
    selectedDropdown
  } from "../../stores/navigation.store.js";
  export let menu;
</script>

<style>
  nav {
    --nav-height: 4rem;
    width: 100%;
    height: var(--nav-height);
    background-color: #fff;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.24);
  }

  .contents {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 60rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contents img {
    margin-top: calc(var(--nav-height) / 2);
    width: 4.5rem;
    height: 4.5rem;
    background-color: #fff;
    border: 0.125rem solid #fff;
    border-radius: 50%;
    box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.24);
  }

  .contents img:hover {
    animation: twist 0.6s;
  }

  .menu-items {
    display: flex;
    list-style-type: none;
  }

  .menu-items li {
    text-transform: uppercase;
    font-weight: 900;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .menu-items li a {
    color: #222;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem;
    transition: background 0.2s ease;
  }

  .menu-items li a:hover {
    background-color: rgba(76, 77, 98, 0.1);
    text-decoration: underline;
  }

  .menu-items li + li,
  .menu-items li:not(:first-of-type) {
    margin-left: 3rem;
  }

  @keyframes twist {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(12deg);
    }
    75% {
      transform: rotate(-6deg);
    }
    100% {
      transform: rotate(0);
    }
  }
</style>

<nav>
  <div class="contents">
    {#if menu.logo}
      <a
        on:click={() => {
          $activeNavItem = null;
          $selectedDropdown = null;
        }}
        href="/">
        <img
          alt={menu.logo.alternativeText}
          src="http://localhost:1337{menu.logo.url}" />
      </a>
    {/if}

    <ul class="menu-items">
      {#each menu.items as item}
        {#if item.__component === 'menu.menu-link'}
          <li
            on:click={() => {
              $activeNavItem = item.label;
              $selectedDropdown = null;
            }}
            class:active={$activeNavItem === item.label}>
            <a href="item.url">{item.label}</a>
          </li>
        {:else if item.__component === 'menu.menu-dropdown'}
          <Dropdown id={item.id} label={item.label} children={item.children} />
        {/if}
      {/each}
    </ul>
  </div>

</nav>
