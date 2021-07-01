<script>
  import { base } from "$lib/config.js";
  import Dropdown from "./Dropdown.svelte";
  import {
    activeNavItem,
    selectedDropdown
  } from "../../stores/navigation.store.js";
  export let menu;
</script>

<style lang="scss">
  @use '../scss/animations' as animate;
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  nav {
    width: 100%;
    height: var.$nav-height;
    background-color: var.$color-light;
    box-shadow: var.$shadow-base;
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

    img {
      @include m.shapes-circle($size: 4.5rem);

      margin-top: var.$nav-height / 2;
      background-color: var.$color-light;
      border: 0.125rem solid var.$color-light;
      box-shadow: var.$shadow-base;

      &:hover {
        animation: animate.$twist;
      }
    }
  }

  .menu-items {
    display: flex;
    list-style-type: none;

    li {
      text-transform: uppercase;
      font-weight: 900;
      font-family: var.$font-family--sans-serif;
  
      a {
        color: #222;
        text-decoration: none;
        font-size: 0.875rem;
        padding: 0.5rem;
        transition: background 0.2s ease;
        &:hover {
          background-color: var.$color-main--fade;
          text-decoration: underline;
        }
      }
    }
  }

  .menu-items li + li,
  .menu-items li:not(:first-of-type) {
    margin-left: 3rem;
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
        <img alt={menu.logo.alternativeText} src={base + menu.logo.url} />
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
            class:active={$activeNavItem === item.label}
            class="nav-item">
            <a href="item.url">{item.label}</a>
          </li>
        {:else if item.__component === 'menu.menu-dropdown'}
          <Dropdown id={item.id} label={item.label} children={item.children} />
        {/if}
      {/each}
    </ul>
  </div>

</nav>
